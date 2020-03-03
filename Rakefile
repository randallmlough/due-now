# Add your own tasks in files placed in lib/tasks ending in .rake,
# for example lib/tasks/capistrano.rake, and they will automatically be available to Rake.

require_relative 'config/application'

Rails.application.load_tasks

namespace :start do
    task :development do
        exec 'heroku local -f Procfile.dev'
    end
end

desc 'Start development server'
task :start => 'start:development'