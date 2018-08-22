class CreateCommunicationChannels < ActiveRecord::Migration[5.2]
  def change
    create_table :communication_channels do |t|
      t.integer :category, null: false, default: 0
      t.string :name, null: false
      t.timestamps
    end

    change_table :communication_methods do |t|
      t.references :communication_channel
      t.remove :channel
    end
  end
end
