class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :first_name
      t.string :last_name
      t.string :login
      t.string :password
      t.text :description
      t.string :sex

      t.timestamps
    end
  end
end
