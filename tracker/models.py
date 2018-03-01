from django.db import models

class Solver(models.Model):
	timus_id = models.CharField(blank=False, max_length=42, unique=True)
	name = models.CharField(blank=False, max_length=100)
	solved = models.IntegerField(default = 0)
	solved_today = models.IntegerField(default = 0)
	current_phase = models.DateField(auto_now = True)

	def __str__(self):
		return self.timus_id + " | " + self.name

	def total_solved(self):
		return self.solved + self.solved_today