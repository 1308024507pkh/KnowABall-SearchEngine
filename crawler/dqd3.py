import requests
from bs4 import BeautifulSoup
import json
import re
import pandas as pd

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64'
                  ') AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36',
    'Connection': 'close'
}


def get_team_news_title(competition_id, team_id):
    url = 'https://dongqiudi.com/team/' + str(team_id) + '.html'
    response = requests.get(url, headers=headers)  # 提交请求
    if response.status_code == 200:
        response.encoding = 'utf-8'
    if response.status_code == 404:
        return None
    team_infos = {'team_id': team_id}
    soup = BeautifulSoup(response.text, 'lxml')
    _layout = soup.find(name="div", id="__layout")
    team_data_wrap = _layout.find(name="div", class_="team-data-wrap")
    team_con = team_data_wrap.find(name="div", class_="team-con")
    team_left = team_con.find(name="div", class_="team-left")
    team_info = team_left.find(name="div", class_="team-info")
    team_info_con = team_info.find(name="div", class_="info-con")
    team_name = team_info_con.find(name="p", class_="team-name").contents[0]
    team_infos["name"] = team_name
    english_name = team_info_con.find(name="p", class_="en-name").contents[0]
    team_infos["english_name"] = english_name
    news_json_url = "https://dongqiudi.com/api/v3/archive/app/channel/feeds?id=" + str(team_id) + "&type=team"
    response2 = requests.get(news_json_url, headers=headers)  # 提交请求
    data = json.loads(response2.text)['data']
    news_urls = ""
    img_urls = ""
    news_titles = ""
    for article in data['articles']:
        article_id = article['id']
        news_url = "https://dongqiudi.com/articles/" + str(article_id) + ".html"
        img_url = article['thumb']
        title = article['title']
        news_urls = news_urls + news_url + "&&"
        news_titles = news_titles + title + "&&"
        img_urls = img_urls + img_url + "&&"
    team_infos["news_titles"] = news_titles[:-2]
    team_infos['news_urls'] = news_urls[:-2]
    team_infos['news_img_urls'] = img_urls[:-2]
    print(competition_id, team_id)
    return team_infos


def get_team_list(competition_id):
    url = 'https://dongqiudi.com/data/' + str(competition_id)
    team_id_list = []
    response = requests.get(url, headers=headers)  # 提交请求
    if response.status_code == 200:
        response.encoding = 'utf-8'
    if response.status_code == 404:
        return None
    teams = response.text.split("team_id:")
    for i in range(1, len(teams)):
        team_id_list.append(int(teams[i][1:9]))
    return team_id_list


def main():
    competition_id_list = [1, 2, 3, 4, 10]
    for competition_id in competition_id_list:
        team_id_list = get_team_list(competition_id)
        team_name_list = list()
        team_english_name_list = list()
        team_news_titles_list = list()
        team_news_urls_list = list()
        team_news_img_url_list = list()
        for team_id in team_id_list:
            team_info = get_team_news_title(competition_id, team_id)
            team_name_list.append(team_info["name"])
            team_english_name_list.append(team_info["english_name"])
            team_news_titles_list.append(team_info["news_titles"])
            team_news_urls_list.append(team_info['news_urls'])
            team_news_img_url_list.append(team_info['news_img_urls'])
        result = pd.DataFrame({
            "id": team_id_list,
            "name": team_name_list,
            "english_name": team_english_name_list,
            "news_titles": team_news_titles_list,
            "news_urls": team_news_urls_list,
            "news_img_urls": team_news_img_url_list,
        })
        result.to_csv('team_news_list_' + str(competition_id) + '.csv', index=False)


if __name__ == '__main__':
    main()

