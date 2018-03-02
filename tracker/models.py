from django.db import models
import urllib2
from BeautifulSoup import BeautifulSoup

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

	def update_solved(self):
		try:
			web_page = urllib2.urlopen("http://acm.timus.ru/author.aspx?id=" + str(self.timus_id) + "&locale=ru").read()
			soup = BeautifulSoup(web_page)
			self.solved = int(soup.findAll('td', attrs={'class':'author_stats_value'})[1].getText().split(" ")[0])
		except Exception as e:
			print "ERROR"