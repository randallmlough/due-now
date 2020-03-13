
class Api::InvoicesController < Api::APIController
    before_action :has_access?, only: [:show, :update, :destroy]
    skip_before_action :require_session!, only: [:preview]
    def index
        if params[:search]
            term = params[:search]
            @invoices = Invoice.where("invoice_number ILIKE ? OR recipient->>'name' LIKE ? OR recipient->>'email_address' LIKE ?", "%#{term}%","%#{term}%","%#{term}%").where("invoices.invoiceable_type = ? AND invoices.invoiceable_id = ?",'User', user_session.id).limit(params[:limit])
        elsif params[:start_date] || params[:end_date]
            start_date = params[:start_date] 
            end_date = params[:end_date]
            @invoices = Invoice.where("due_date between ? and ?", start_date, end_date).where("invoices.invoiceable_type = ? AND invoices.invoiceable_id = ?",'User', user_session.id).order(invoice_date: :asc)
        else
            @invoices ||= Invoice.where("invoices.created_by = ? OR invoices.invoiceable_type = 'User' AND invoices.invoiceable_id = ?", user_session.id,  user_session.id).order(invoice_date: :asc).limit(params[:limit])
        end
        render :index, status: 200
    end
    
    def create
        @invoice = Invoice.new(invoice_params.merge({:created_by => user_session.id}))
        @invoice.invoice_items = params[:invoice_items].map do |item|
            item_hash = {}
            item_hash[:description] = item[:description]
            item_hash[:qty] = item[:qty]
            item_hash[:rate] = item[:rate]
            item_hash[:total] = item[:total]
            InvoiceItem.new(item_hash)
        end

        if params[:invoice_type] == 'organization'
            
        else
            @invoice.invoiceable = user_session.user
        end
        authorize @invoice
        if @invoice.save
            render :show, status: 201
        else
            puts @invoice.errors
            render json: @invoice.errors.to_json, status: 400
        end
    end

    def show
        @invoice ||= find_invoice(params[:id], invoiceable_type)
        render :show, status: 200
    end

    def preview
        @invoice ||= Invoice.find_by(uuid: params[:uuid])
        if @invoice.nil? || (@invoice.private? && !(@invoice.created_by = user_session.id ))
            head 404, content_type: "application/json"
        else
            render :show, status: 200
        end
    end

    def update
        if @invoice.update(invoice_params)
            render :show, status: 200
        else
            render json: @invoice.errors.to_json, status: 400
        end 
    end
 
    def destroy
        @invoice ||= find_invoice(params[:id],invoiceable_type)
        if @invoice.created_by == user_session.id
            if @invoice.destroy
                head 204, content_type: "application/json"
            else
                render json: @invoice.errors.to_json, status: 400
            end
        else
            head 403, content_type: "application/json"
        end
    end

    private
    def invoice_params
        params.require(:invoice).permit(:invoice_number, :invoice_date, :payment_terms, :due_date, :private, :tax, :total, :notes, :invoice_items => [:description, :qty, :rate, :total], :from => [:name, :email_address, :phone_number, :mailing_address], :recipient => [:name, :email_address, :phone_number, :mailing_address])
    end

    def has_access?
        find_invoice(params[:id],invoiceable_type) ? (authorize @invoice) : (head 404, content_type: "application/json")
    end

    def find_invoice(invoice_id, type)
        @invoice = Invoice.find_by("invoices.id = ? AND invoices.invoiceable_type = ? AND invoices.invoiceable_id = ?", invoice_id,  type, user_session.id)
    end

    def invoiceable_type
        params[:organization_id] ? 'Organization' : 'User'
    end
end