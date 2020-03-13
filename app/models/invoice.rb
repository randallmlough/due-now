# == Schema Information
#
# Table name: invoices
#
#  id               :bigint           not null, primary key
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  uuid             :string           not null
#  invoice_number   :string           not null
#  invoice_date     :datetime
#  payment_terms    :string
#  due_date         :datetime
#  invoiceable_type :string           not null
#  invoiceable_id   :integer          not null
#  created_by       :integer          not null
#  private          :boolean          default("false")
#  recipient        :jsonb            not null
#  notes            :string
#  tax              :integer
#  discount         :integer
#  deposit          :integer
#  paid             :boolean          default("false")
#
class Recipient
    include StoreModel::Model
  
    attribute :name, :string
    attribute :email_address, :string
    attribute :mailing_address, :string
    attribute :phone_number, :string
  
    validates :name, presence: {message: "recipient name can not be empty"}
    # validates :email_address, presence: {message: "recipient email can not be empty"}
end

class Invoice < ApplicationRecord
    has_many :invoice_items, dependent: :destroy
    belongs_to :invoiceable, polymorphic: true
    
    attribute :recipient, Recipient.to_type, default: {}
    attribute :from, Recipient.to_type, default: {}

    validates :uuid, :invoice_number, :created_by, :invoiceable_type, :invoiceable_id, presence: true
    validates :uuid, uniqueness: true
    validates :recipient, store_model: { merge_errors: true }
    validates :from, store_model: { merge_errors: true }
    

    after_initialize :new_uuid, :ensure_invoice_number

    def private?
        self.private
    end
    
    private
    def new_uuid
        self.uuid ||= SecureRandom.uuid
    end

    def ensure_invoice_number
        self.invoice_number ||= random_invoice_number
    end

    def random_invoice_number
        SecureRandom.hex(4)
    end
end
