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

# current month
12.times do
  d = Date.today
  days_in_month = Time.days_in_month(d.month - 1, d.year)
  
  start_date = Faker::Date.in_date_period(month: d.month)
  due_date = Faker::Date.between(from: start_date, to: (days_in_month - d.day).days.from_now)

  i = Invoice.new(created_by: demo.id, invoice_date: start_date,due_date: due_date, private: [true, false].sample, paid: [true,false].sample, payment_terms: ['net 30', 'net 15', 'net 21'].sample, from: {name: 'Demo Account', email_address: 'demo@example.com', mailing_address: Faker::Address.full_address, phone:Faker::PhoneNumber.phone_number}, recipient: {name: Faker::Name.name , email_address: Faker::Internet.email, mailing_address: Faker::Address.full_address, phone:Faker::PhoneNumber.phone_number})
  i.invoiceable = demo

  if [true, false].sample
    i.notes = "#{Faker::Beer.style} 
    #{Faker::Beer.malts}
    #{Faker::Beer.ibu}
    #{Faker::Beer.alcohol}"
  end
  items = []
  subTotal = 0
  rand(1..4).times do
    qty = Faker::Number.between(from: 1, to: 6)
    rate =  Faker::Commerce.price
    total = rate * qty
    subTotal = subTotal + total
    item = InvoiceItem.new(description: Faker::Beer.name, rate: rate, qty: qty, total: total)
    item.invoice = i
    items << item
  end
  tax_percent = Faker::Number.normal(mean: 5, standard_deviation: 1.5).round(2)
  i.tax = tax_percent
  tax = subTotal * (tax_percent /100)
  total = subTotal + tax
  i.total = total.round(2)
  i.invoice_items = items
  i.save
end

# past month
15.times do
  d = Date.today
  days_in_month = Time.days_in_month(d.month - 1, d.year)
  
  start_date = Faker::Date.in_date_period(month: d.month - 1)
  due_date = Faker::Date.between(from: start_date, to: start_date + (days_in_month - d.day).days)
  i = Invoice.new(created_by: demo.id, invoice_date: start_date,due_date: due_date, private: [true, false].sample, paid: [true,false].sample, payment_terms: ['net 30', 'net 15', 'net 21'].sample, from: {name: 'Demo Account', email_address: 'demo@example.com', mailing_address: Faker::Address.full_address, phone:Faker::PhoneNumber.phone_number}, recipient: {name: Faker::Name.name , email_address: Faker::Internet.email, mailing_address: Faker::Address.full_address, phone:Faker::PhoneNumber.phone_number})
  i.invoiceable = demo

  if [true, false].sample
    i.notes = "#{Faker::Beer.style} 
    #{Faker::Beer.malts}
    #{Faker::Beer.ibu}
    #{Faker::Beer.alcohol}"
  end

  items = []
  subTotal = 0
  rand(1..4).times do
    qty = Faker::Number.between(from: 1, to: 6)
    rate =  Faker::Commerce.price
    total = rate * qty
    subTotal = subTotal + total
    item = InvoiceItem.new(description: Faker::Beer.name, rate: rate, qty: qty, total: total)
    item.invoice = i
    items << item
  end
  tax_percent = Faker::Number.normal(mean: 5, standard_deviation: 1.5).round(2)
  i.tax = tax_percent
  tax = subTotal * (tax_percent /100)
  total = subTotal + tax
  i.total = total.round(2)
  i.invoice_items = items
  i.save
end

# future
20.times do
  t = Faker::Date.forward(days: 160)
  e = t + Faker::Number.between(from: 1, to: 160).days
  i = Invoice.new(created_by: demo.id, invoice_date: t,due_date: Faker::Date.between(from:t, to: e), private: [true, false].sample, paid: [true,false].sample, payment_terms: ['net 30', 'net 15', 'net 21'].sample, from: {name: 'Demo Account', email_address: 'demo@example.com', mailing_address: Faker::Address.full_address, phone:Faker::PhoneNumber.phone_number}, recipient: {name: Faker::Name.name , email_address: Faker::Internet.email, mailing_address: Faker::Address.full_address, phone:Faker::PhoneNumber.phone_number})
  i.invoiceable = demo

  if [true, false].sample
    i.notes = "#{Faker::Beer.style} 
    #{Faker::Beer.malts}
    #{Faker::Beer.ibu}
    #{Faker::Beer.alcohol}"
  end
  items = []
  subTotal = 0
  rand(1..4).times do
    qty = Faker::Number.between(from: 1, to: 6)
    rate =  Faker::Commerce.price
    total = rate * qty
    subTotal = subTotal + total
    item = InvoiceItem.new(description: Faker::Beer.name, rate: rate, qty: qty, total: total)
    item.invoice = i
    items << item
  end
  tax_percent = Faker::Number.normal(mean: 5, standard_deviation: 1.5).round(2)
  i.tax = tax_percent
  tax = subTotal * (tax_percent /100)
  total = subTotal + tax
  i.total = total.round(2)
  i.invoice_items = items
  i.save
end


