# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_03_06_051826) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "invoice_items", force: :cascade do |t|
    t.bigint "invoice_id"
    t.string "name", null: false
    t.float "rate", null: false
    t.string "per", default: "per item", null: false
    t.integer "qty", null: false
    t.text "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["invoice_id"], name: "index_invoice_items_on_invoice_id"
  end

  create_table "invoices", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "uuid", null: false
    t.string "invoice_number", null: false
    t.datetime "invoice_date"
    t.string "payment_terms"
    t.datetime "due_date"
    t.string "invoiceable_type", null: false
    t.integer "invoiceable_id", null: false
    t.integer "created_by", null: false
    t.boolean "private", default: false
    t.jsonb "recipient", default: {}, null: false
    t.string "notes"
    t.integer "tax"
    t.integer "discount"
    t.integer "deposit"
    t.boolean "paid", default: false
    t.index "((recipient ->> 'email_address'::text))", name: "recipient_email_address_index"
    t.index "((recipient ->> 'name'::text))", name: "recipient_name_index"
    t.index ["created_by"], name: "index_invoices_on_created_by"
    t.index ["invoice_number"], name: "index_invoices_on_invoice_number"
    t.index ["invoiceable_type", "invoiceable_id"], name: "index_invoices_on_invoiceable_type_and_invoiceable_id"
    t.index ["uuid"], name: "index_invoices_on_uuid", unique: true
  end

  create_table "users", force: :cascade do |t|
    t.string "first_name"
    t.string "last_name"
    t.string "email"
    t.string "avatar"
    t.string "password_digest", null: false
    t.string "session_token"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["session_token"], name: "index_users_on_session_token", unique: true
  end

end
