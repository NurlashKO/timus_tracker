from django_cron import CronJobBase, Schedule
from django.core.management import call_command
from .models import Solver

class MyCronJob(CronJobBase):
	RUN_EVERY_MINS = 1

	schedule = Schedule(run_every_mins=RUN_EVERY_MINS)
	code = 'my_app.my_cron_job'

	def do(self):
		solver = Solver.objects.get(name="NurlashKO")
		solver.solved += 1
		solver.save()
		call_command('runcrons')