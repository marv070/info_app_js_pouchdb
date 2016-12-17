require 'sinatra'
require 'gon-sinatra'
Sinatra::register Gon::Sinatra
get'/' do
  erb :info
end

post '/details' do
  @first_name = params[:first_name]
  @last_name = params[:last_name]
  @email = params[:email]
  gon.first_name = @first_name
  gon.last_name = @last_name
  gon.email = @email
  erb :show_details, :locals => {:first_name => @first_name, :last_name => @last_name, :email => @email}
end