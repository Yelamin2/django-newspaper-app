from rest_framework import permissions

class ProfilePermissions(permissions.BasePermission):

    def has_object_permission(self, request, view, obj):
         # import pdb 
         # pdb.set_trace()

         if request.method in permissions.SAFE_METHODS:
            return True
         # elif request.method == 'POST':
         #    return True
         elif request.method == 'DELETE':
            return obj.user == request.user or request.user.is_staff
         elif request.method == 'PUT':
            return obj.user == request.user 
         
         return obj.user == request.user


class IsOwner(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        
        return obj.user == request.user

class IsStaff(permissions.IsAdminUser):
   pass