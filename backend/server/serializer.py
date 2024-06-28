from rest_framework import serializers
from .models import Server, Category, Channel


class ChannelSerializer(serializers.ModelSerializer):

    class Meta:
        model = Channel
        fields = '__all__'

class ServerSerializer(serializers.ModelSerializer):

    num_members = serializers.SerializerMethodField()
    channel_server = ChannelSerializer(many=True)# using the related_name

    class Meta:
        model = Server
        # fields = '__all__'
        exclude = ("members",)

    def get_num_members(self, obj):
        if hasattr(obj, 'num_members'):
            return obj.num_members
        return None
    
    def to_representation(self, instance):
        data = super().to_representation(instance)
        num_members = self.context.get('num_members')
        if not num_members:
            data.pop('num_members')
        return data
    