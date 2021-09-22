import requests
from bs4 import BeautifulSoup
import json
import re
import pandas as pd

article_id_set = set()
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64'
                  ') AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36',
    'Connection': 'close'
}


def get_articles_contents(article_id_list, name, thumb_list):
    id_list = list()
    url_list = list()
    title_list = list()
    author_list = list()
    time_list = list()
    content_list = list()
    tag_list = list()
    img_url_list = list()
    i = 0
    for article_id in article_id_list:
        print(name + str(i))
        i += 1
        try:
            url = "https://dongqiudi.com/articles/" + str(article_id) + ".html"
            response = requests.get(url, headers=headers)
            soup = BeautifulSoup(response.text, 'lxml')
            title_element = soup.find(name="h1", class_="news-title")
            if title_element is None:
                continue
            title = title_element.string
            tips = soup.find(name="p", class_="tips")
            tips_spans = tips.find_all(name='span')
            author = tips_spans[-1].string
            time = str(tips)[-15:-4]
            content_element = soup.find(name='div', class_="con")
            p_elements = content_element.find_all(name='p')
            content = []
            for p in p_elements:
                if p.string is not None:
                    content.append(p.string)
            tags = []
            tag_items = soup.find_all(name='dl', class_="tag-item")
            for tag in tag_items:
                tags.append(tag.find(name='p').string)
            id_list.append(article_id)
            url_list.append(url)
            title_list.append(title)
            author_list.append(author)
            time_list.append(time)
            content_list.append(content)
            tag_list.append(tags)
            img_url_list.append(thumb_list[i-1])
        except requests.exceptions.ConnectionError:
            print("Connection refused")
    result = pd.DataFrame({
        "article_id": id_list,
        "url": url_list,
        "title": title_list,
        "author": author_list,
        "time": time_list,
        "content": content_list,
        "tags": tag_list,
        "img_url": img_url_list
    })
    result.to_csv(name + '新闻2.csv', index=False)


def get_thousand_article(id, name):
    article_id_list = list()
    thumb_list = list()
    after = 1626399452
    while len(article_id_list) < 1500:
        url = "https://api.dongqiudi.com/app/tabs/web/" + str(id) + ".json?after=" + str(after)
        response = requests.get(url, headers=headers)  # 提交请求
        data = json.loads(response.text)
        for article in data['articles']:
            article_id = article['id']
            thumb = article['thumb']
            if article_id not in article_id_set:
                article_id_set.add(article_id)
                article_id_list.append(article_id)
                thumb_list.append(thumb)
        after = after - 3000
    get_articles_contents(article_id_list, name, thumb_list)


def main():
    id_list = [3, 4, 5, 6]
    name_list = ['英超', '意甲', '西甲', '德甲']
    for i in range(4):
        get_thousand_article(id_list[i], name_list[i])
    # print(article_id_list)


if __name__ == '__main__':
    main()
