# == Schema Information
#
# Table name: invoice_items
#
#  id          :bigint           not null, primary key
#  invoice_id  :bigint
#  name        :string           not null
#  rate        :float            not null
#  per         :string           default("per item"), not null
#  qty         :integer          not null
#  description :text
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
class InvoiceItem < ApplicationRecord
    belongs_to :invoice

    validates :description, :qty, :rate, :total, presence: true
end
