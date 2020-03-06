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
require 'test_helper'

class InvoiceTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
