class AddSuperuserToUsers < ActiveRecord::Migration[5.2]
  def change
    change_table :users do |t|
      t.boolean :superuser, default: false
    end
  end
end
