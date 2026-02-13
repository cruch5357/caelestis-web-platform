from django.db import models

# Create your models here.


class GeneroAnimal(models.Model):
    id_genero = models.AutoField(db_column='idGenero', primary_key=True)
    genero = models.CharField(max_length=50, blank=False)

    def __str__(self):
        return self.genero


class Animal(models.Model):
    id_animal           = models.AutoField(primary_key=True)
    nombre_animal       = models.CharField(max_length=100)
    especie_animal      = models.CharField(max_length=100)
    descripcion_animal  = models.TextField()
    anno_nacimiento     = models.IntegerField()
    nativo              = models.CharField(max_length=100)
    genero_animal       = models.ForeignKey(GeneroAnimal, on_delete=models.CASCADE)
    llegada             = models.DateField()
    imagen_animal       = models.ImageField(upload_to='fotos/', null=True)

    def __str__(self):
        return self.nombre_animal