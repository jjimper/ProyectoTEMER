import json
import csv
import os

# Nombres de los archivos
archivo_entrada = '../puntuaciones.json'
archivo_salida = 'puntuaciones.csv'

def convertir_json_a_csv():
    if not os.path.exists(archivo_entrada):
        print(f"Error: No se encuentra el archivo '{archivo_entrada}'")
        return

    try:
        with open(archivo_entrada, 'r', encoding='utf-8') as f:
            datos = json.load(f)

        if not datos:
            print("El archivo JSON está vacío.")
            return

        cabeceras = datos[0].keys()

        with open(archivo_salida, 'w', newline='', encoding='utf-8') as f:
            writer = csv.DictWriter(f, fieldnames=cabeceras)
            

            writer.writeheader()
            writer.writerows(datos)

        print(f" Se han exportado {len(datos)} registros a '{archivo_salida}'")

    except json.JSONDecodeError:
        print("Error: El archivo JSON está corrupto o mal formado.")
    except Exception as e:
        print(f"Ocurrió un error inesperado: {e}")

# Ejecutar la función
if __name__ == "__main__":
    convertir_json_a_csv()