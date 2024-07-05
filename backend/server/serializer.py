from rest_framework import serializers
from .models import Server, Category, Channel

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"

# Serializer for the Channel model
class ChannelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Channel
        fields = '__all__'  # Include all fields from the Channel model

# Serializer for the Server model
class ServerSerializer(serializers.ModelSerializer):
    # Custom field to get the number of members in the server
    num_members = serializers.SerializerMethodField()
    # Nested serializer for channels related to the server, using the related_name 'channel_server'
    channel_server = ChannelSerializer(many=True)
    category = serializers.StringRelatedField()

    class Meta:
        model = Server
        # fields = '__all__'  # Include all fields from the Server model
        exclude = ("members",)  # Exclude the 'members' field from the serialized output

    # Method to get the number of members in the server
    def get_num_members(self, obj):
        if hasattr(obj, 'num_members'):
            return obj.num_members
        return None

    # Custom method to control the serialized representation of the instance
    def to_representation(self, instance):
        # Get the default representation from the parent class
        data = super().to_representation(instance)
        # Check if 'num_members' is included in the context
        num_members = self.context.get('num_members')
        # If 'num_members' is not included in the context, remove it from the serialized data
        if not num_members:
            data.pop('num_members')
        return data