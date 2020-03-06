class CreateInvoiceItems < ActiveRecord::Migration[5.2]
  def change
    create_table :invoice_items do |t|
      t.belongs_to :invoice, index: true
      t.string :name, null: false
      t.float :rate, null: false
      t.string :per, null: false, default: "per item"
      t.integer :qty, null: false
      t.text :description

      t.timestamps
    end

  end
end
