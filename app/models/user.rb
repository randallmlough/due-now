# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  first_name      :string
#  last_name       :string
#  email           :string
#  avatar          :string
#  password_digest :string           not null
#  session_token   :string
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
require 'bcrypt'
require 'digest'
class User < ApplicationRecord
    include Jwt

    def self.find_by_credentials(email,password)
        u = User.find_by(email: email)
        u && BCrypt::Password.new(u.password_digest).is_password?(password) ? u : nil
    end

    has_many :invoices, as: :invoiceable

    validates :first_name, :last_name, :avatar, :email, :password_digest, :session_token, presence: true
    validates :email, :session_token, uniqueness: true
    validates :password, length: {minimum: 6}, allow_nil: true

    after_initialize :ensure_session_token, :gravatar_email

    attr_reader :password
    def password=(password)
        @password = password
        self.password_digest = BCrypt::Password.create(password)
    end

    def reset_session_token!
        self.session_token = new_session_token
        self.save!
        self.session_token
    end

    def generate_jwt
        Jwt.generate_jwt(self)
    end

    def admin?
        false
    end

    private
    def ensure_session_token
        self.session_token ||= new_session_token
    end

    def ensure_avatar
        self.avatar ||= gravatar_email
    end

    def new_session_token
        SecureRandom::urlsafe_base64
    end

    def gravatar_email
        md5 = Digest::MD5.new
        md5 << self.email
        self.avatar = "https://www.gravatar.com/avatar/#{md5.hexdigest}?f=y&d=mp"
    end
end
