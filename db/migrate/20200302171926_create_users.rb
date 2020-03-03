class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string :first_name
      t.string :last_name
      t.string :email, index: {unique: true}
      t.string :avatar
      t.string :password_digest, null: false
      t.string :session_token, index: {unique: true}

      t.timestamps
    end
  end
end
