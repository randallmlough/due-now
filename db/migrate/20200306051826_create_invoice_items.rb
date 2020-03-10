class CreateInvoiceItems < ActiveRecord::Migration[5.2]
  def change
    create_table :invoice_items do |t|
      t.belongs_to :invoice, index: true
      t.integer :qty, null: false, default: 0
      t.float :rate, null: false, default: 0
      t.float :total, null: false, default: 0
      t.text :description

      t.timestamps
    end

  end
end
