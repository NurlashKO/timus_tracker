import urllib2
from BeautifulSoup import BeautifulSoup
def getUserSolver(cur_id):
	try:
		web_page = urllib2.urlopen("http://acm.timus.ru/author.aspx?id=" + str(cur_id) + "&locale=ru").read()
		soup = BeautifulSoup(web_page)
		name = soup.findAll('td', attrs={'class':'author_stats_value'})[1].getText().split(" ")[0]
		return int(name)

	except Exception as e:
		print "ERROR"
		return -1

print getUserSolver(134124)