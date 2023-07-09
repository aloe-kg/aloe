from django.core.management.base import BaseCommand
from googletrans import Translator

from api.models import *


class Command(BaseCommand):
    help = "Sets URL path for categories that do not have it"

    def handle(self, *args, **options):
        translator = Translator()
        for i in Category.objects.filter(url_path__isnull=True):
            i.url_path = "-".join(
                map(str, translator.translate(i.name.lower()).text.replace(',', ' ').replace('&', ' ').split())
            )
            i.save()
