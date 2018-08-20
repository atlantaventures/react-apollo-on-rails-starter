class CreateCommunicationMethods < ActiveRecord::Migration[5.2]
  def change
    create_table :communication_methods do |t|
      t.integer :channel, null: false
      t.string :name, null: false
      t.text :description, null: false

      t.timestamps
    end
  end
end
