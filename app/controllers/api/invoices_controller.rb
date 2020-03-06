
class Api::InvoicesController < Api::APIController
    before_action :has_access?, only: [:show, :update, :destroy]

    def index
        @invoices ||= Invoice.where("invoices.created_by = ? OR invoices.invoiceable_type = 'User' AND invoices.invoiceable_id = ?", user_session.id,  user_session.id)
        render :index, status: 200
    end
    
    def create
        @invoice = Invoice.new(invoice_params.merge({:created_by => user_session.id}))
        if params[:invoice_type] == 'individual'
            @invoice.invoiceable = user_session.user
        elsif params[:invoice_type] == 'organization'
            # TODO 
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

    def update
        @invoice ||= find_invoice(params[:id],invoiceable_type)
        if @invoice.created_by == user_session.id
            if @invoice.update(invoice_params)
                render :show, status: 200
            else
                render json: @invoice.errors.to_json, status: 400
            end 
        else
            head 403, content_type: "application/json"
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
        params.require(:invoice).permit(:invoice_number, :invoice_date, :payment_terms, :due_date, :private, :recipient => [:name, :email_address])
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