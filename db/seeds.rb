# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'faker'

User.destroy_all
Invoice.destroy_all
InvoiceItem.destroy_all


demo = User.create!(first_name: 'demo', last_name: 'account', email: 'demo@example.com', password: "1234567")
10.times do
  t = Faker::Date.in_date_period
  i = Invoice.new(created_by: demo.id, invoice_date: t,due_date: Faker::Date.between(from: t.days_ago(60), to: t), private: [true, false].sample, paid: [true,false].sample, payment_terms: ['net 30', 'net 15', 'net 21'].sample,recipient: {name: Faker::Name.name , email_address: Faker::Internet.email, mailing_address: Faker::Address.full_address, phone:Faker::PhoneNumber.phone_number})
  i.invoiceable = demo
  i.save
  rand(1..4).times do 
    item = InvoiceItem.new(name: Faker::Beer.name, rate: Faker::Commerce.price, qty: Faker::Number.between(from: 1, to: 6))
    item.invoice = i
    item.save
  end
end


5.times do
  u = User.create!(first_name: Faker::Name.first_name, last_name: Faker::Name.last_name, email: Faker::Internet.email, password: "1234567", avatar: Faker::Avatar.image)
  rand(1..4).times do
    t = Faker::Date.in_date_period
    i = Invoice.new(created_by: u.id, invoice_date: t,due_date: Faker::Date.between(from: t.days_ago(60), to: t), private: [true, false].sample, paid: [true,false].sample, payment_terms: ['net 30', 'net 15', 'net 21'].sample,recipient: {name: Faker::Name.name , email_address: Faker::Internet.email, mailing_address: Faker::Address.full_address, phone:Faker::PhoneNumber.phone_number})
    i.invoiceable = u
    i.save
    rand(1..4).times do 
      item = InvoiceItem.new(name: Faker::Beer.name, rate: Faker::Commerce.price, qty: Faker::Number.between(from: 1, to: 6))
      item.invoice = i
      item.save
    end
    
  end
end

