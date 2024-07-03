from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import ValidationError, AuthenticationFailed
from django.db.models import Count
from.schema import server_list_docs
from .models import Server
from .serializer import ServerSerializer

class ServerListViewSet(viewsets.ViewSet):
    # Define the base queryset to retrieve all Server objects
    queryset = Server.objects.all()
    permission_classes = [IsAuthenticated]
    
    @server_list_docs
    def list(self, request):
        """
        Hello Description Test Man
        """
        # Retrieve query parameters from the request
        category = request.query_params.get('category')
        by_user = request.query_params.get('by_user') == 'true'
        qty = request.query_params.get('qty')
        server_id = request.query_params.get('server_id')
        with_num_members = request.query_params.get('with_num_members') == 'true'

        # Check authentication for certain operations
        if (by_user or server_id) and not request.user.is_authenticated:
            raise AuthenticationFailed()
        
        # Filter the queryset based on the category parameter
        if category:
            self.queryset = self.queryset.filter(category__name=category)

        # Filter the queryset to include only servers the current user is a member of
        if by_user:
            user_id = request.user.id
            self.queryset = self.queryset.filter(members=user_id)
        
        # Annotate the queryset to include the number of members in each server
        if with_num_members:
            self.queryset = self.queryset.annotate(num_members=Count('members'))

        # Limit the number of servers in the queryset based on the qty parameter
        if qty:
            self.queryset = self.queryset[:int(qty)]

        # Filter the queryset based on the server_id parameter
        if server_id:
            try:
                self.queryset = self.queryset.filter(id=server_id)
                if not self.queryset.exists():
                    # Raise an error if the server with the given ID does not exist
                    raise ValidationError(detail=f"Server with id {server_id} Not Found")
            except ValueError:
                # Raise a value error if the server_id parameter is not valid
                raise ValueError(detail=f"An Error has Occurred")
        
        # Serialize the queryset
        serializer = ServerSerializer(self.queryset, many=True, context={'num_members': with_num_members})
        
        # Return the serialized data in the response
        return Response(serializer.data)
