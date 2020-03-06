
class InvoicePolicy < ApplicationPolicy
    attr_reader :user, :invoice
  
    def initialize(user, invoice)
      @user = user
      @invoice = invoice
    end
  
    def create?
      puts "in create policy"
      has_super_rights? || user.invoices[:create]
    end

    def show?
      puts "in show policy"
      has_super_rights? || user.invoices[:view]
    end

    def update?
      puts "in update policy"
      has_super_rights? || user.invoices[:update]
    end

    def destroy?
      puts "in destroy policy"
      has_super_rights? || user.invoices[:delete]
    end

    private
    def has_super_rights?
      is_owner? || user.admin? 
    end

    def is_owner?
      invoice.invoiceable_type == 'User' && invoice.invoiceable_id == user.id
    end
end
