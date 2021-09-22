import requests
from bs4 import BeautifulSoup
import json
import re
import pandas as pd

article_id_set = set()
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64'
                  ') AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36',
}


def get_articles_contents(article_id_list, name):
    url_list = list()
    title_list = list()
    author_list = list()
    time_list = list()
    content_list = list()
    tag_list = list()
    i = 0
    for article_id in article_id_list:
        print(name + str(i))
        i += 1
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
        url_list.append(url)
        title_list.append(title)
        author_list.append(author)
        time_list.append(time)
        content_list.append(content)
        tag_list.append(tags)
    result = pd.DataFrame({
        "url": url_list,
        "title_list": title_list,
        "author_list": author_list,
        "time_list": time_list,
        "content_list": content_list,
        "tag_list": tag_list
    })
    result.to_csv(name + '新闻.csv', index=False)


def get_thousand_article(id, name):
    article_id_list = []
    after = 1625843423
    while len(article_id_list) < 1000:
        url = "https://api.dongqiudi.com/app/tabs/web/" + str(id) + ".json?after=" + str(after)
        response = requests.get(url, headers=headers)  # 提交请求
        data = json.loads(response.text)
        for article in data['articles']:
            article_id = article['id']
            if article_id not in article_id_set:
                article_id_set.add(article_id)
                article_id_list.append(article_id)
        after = after - 3000
    get_articles_contents(article_id_list, name)


def main():
    id_list = [3, 4, 5, 6]
    name_list = ['英超', '意甲', '西甲', '德甲']
    for i in range(0, 2):
        get_thousand_article(id_list[i], name_list[i])
    # print(article_id_list)


if __name__ == '__main__':
    main()
