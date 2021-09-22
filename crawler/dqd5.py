import requests
from bs4 import BeautifulSoup
import json
import re
import pandas as pd

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64'
                  ') AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36',
}


def get_team_img_url(competition_id, team_id):
    url = 'https://dongqiudi.com/team/' + str(team_id) + '.html'
    response = requests.get(url, headers=headers)  # 提交请求
    if response.status_code == 200:
        response.encoding = 'utf-8'
    if response.status_code == 404:
        return None

    soup = BeautifulSoup(response.text, 'lxml')
    img = soup.find(name="img", class_="team-logo")
    img_url = img['src']
    print(competition_id, team_id)
    return img_url


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
        team_img_url_list = list()
        for team_id in team_id_list:
            img_url = get_team_img_url(competition_id, team_id)
            team_img_url_list.append(img_url)
        result = pd.DataFrame({
            "id": team_id_list,
            "img_url": team_img_url_list
        })
        result.to_csv('team_img_url_list_' + str(competition_id) + '.csv', index=False)


if __name__ == '__main__':
    main()
