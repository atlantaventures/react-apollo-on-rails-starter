# monkeypatch https://github.com/ontohub/graphql-pundit/issues/58
class GraphQL::Pundit::Field
  def self.current_user
    :current_user
  end
end
# end monkeypatch https://github.com/ontohub/graphql-pundit/issues/58


class Types::BaseObject < GraphQL::Schema::Object
  field_class GraphQL::Pundit::Field
end
