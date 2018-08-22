class CreateCommunicationMethodPreferences < ActiveRecord::Migration[5.2]
  def change
    create_table :communication_preferences do |t|
      t.references :user
      t.references :communication_method
      t.timestamps
    end
  end
end
