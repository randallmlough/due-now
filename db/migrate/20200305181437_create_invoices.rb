class CreateInvoices < ActiveRecord::Migration[5.2]
  def change
    create_table :invoices do |t|
      t.timestamps
      t.string :uuid, null: false, index: {unique: true}
      t.string :invoice_number, null: false, index: true
      t.timestamp :invoice_date
      t.string :payment_terms
      t.timestamp :due_date
      t.string :invoiceable_type, null: false
      t.integer :invoiceable_id, null: false
      t.integer :created_by, null: false, index: true
      t.boolean :private, default: false
      t.jsonb :recipient, null: false, default: {}
      t.string :notes
      t.integer :tax
      t.integer :discount
      t.integer :deposit
      t.boolean :paid, default: false
    end

    add_index :invoices, [:invoiceable_type, :invoiceable_id]

    execute <<-SQL
      CREATE INDEX recipient_name_index ON invoices ((recipient->>'name'));  
      CREATE INDEX recipient_email_address_index ON invoices ((recipient->>'email_address'));
    SQL
  end
end
 