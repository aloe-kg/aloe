from django.core.management.base import BaseCommand

from api.models import *


class Command(BaseCommand):
    help = "Prepends folder name to products images path"

    def handle(self, *args, **options):
        for i in Product.objects.exclude(image__contains="/"):
            i.image.name = "product_images/" + i.image.name
            i.save()
