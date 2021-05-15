from bs4 import BeautifulSoup
from bs4.element import Stylesheet

# <link rel="stylesheet" href="/static/css/main.bebd0e94.chunk.css">
def main():
    html = open("build\index.html").read()
    soup = BeautifulSoup(html, features="html5lib")
    link = soup.new_tag('link', rel="stylesheet", href="/static/css/main.bebd0e94.chunk.css")
    soup.html.head.insert(2, link)
    print('The link attribute was added to fix css')

    with open("build\index.html", "w") as file:
        file.write(str(soup))
if __name__ == "__main__":
    main()
