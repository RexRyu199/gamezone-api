import re

import requests
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from zeep import Client
from zeep.exceptions import Error as ZeepError
from zeep.transports import Transport

WSDL = 'http://webservices.oorsprong.org/websamples.countryinfo/CountryInfoService.wso?WSDL'


class CountrySoapView(APIView):
    """Consume un servicio SOAP público (CountryInfoService) con zeep."""
    permission_classes = [IsAuthenticated]

    def get(self, request, iso):
        iso = iso.upper()
        if not re.fullmatch(r'[A-Z]{2}', iso):
            return Response({'detail': 'Usa un código ISO de 2 letras, por ejemplo MX.'}, status=400)

        try:
            client = Client(WSDL, transport=Transport(timeout=10))
            info = client.service.FullCountryInfo(iso)
        except (ZeepError, requests.RequestException):
            return Response({'detail': 'No se pudo consultar el servicio SOAP.'}, status=502)

        if not info or 'not found' in (info.sName or '').lower():
            return Response({'detail': 'País no encontrado.'}, status=404)

        return Response({
            'fuente': 'SOAP (CountryInfoService)',
            'iso': info.sISOCode,
            'pais': info.sName,
            'capital': info.sCapitalCity,
            'telefono': info.sPhoneCode,
            'continente': info.sContinentCode,
            'moneda': info.sCurrencyISOCode,
            'bandera': info.sCountryFlag,
        })