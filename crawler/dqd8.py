import requests
from bs4 import BeautifulSoup
import json
import re
import pandas as pd

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64'
                  ') AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36',
}


def get_person_info(person_id):
    url = "https://dongqiudi.com/player/" + str(person_id) + ".html"
    response = requests.get(url, headers=headers)  # 提交请求
    if response.status_code == 200:
        response.encoding = 'utf-8'
    if response.status_code == 404:
        return None

    player_infos = {}
    soup = BeautifulSoup(response.text, 'lxml')
    player_content = soup.find(name="div", class_="player-con")

    # 解析比赛信息
    player_left = player_content.find(name='div', class_='player-left')
    player_data = player_left.find(name="div", class_="player-data")

    # 解析荣誉信息
    honor_data = player_data.find(name="div", class_="hornor-record")
    hd = []
    try:
        for item in honor_data.find_all(name='div', class_="hornor-list"):
            #     print(item.prettify())
            years = ""
            year_elements = item.find_all(name="b")
            for year_element in year_elements:
                years = years + year_element.string + "_"
            l = [item.find(name="span", class_="champion").string, years]
            hd.append(l)
    except:
        pass
    player_infos["honor_record"] = hd
    return player_infos


def get_person_list(team_id):
    url = 'https://dongqiudi.com/team/' + str(team_id) + '.html'
    person_id_list = []
    response = requests.get(url, headers=headers)  # 提交请求
    if response.status_code == 200:
        response.encoding = 'utf-8'
    if response.status_code == 404:
        return None
    players = response.text.split("person_id:")
    for i in range(1, len(players)):
        person_id_list.append(int(players[i][1:9]))
    print('person_id_list for ' + str(team_id) + ": " + str(person_id_list))
    return person_id_list


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
        for team_id in team_id_list:
            person_id_list = get_person_list(team_id)
            person_honor_record_list = list()
            for person_id in person_id_list:
                person_info = get_person_info(person_id)
                person_honor_record_list.append(person_info["honor_record"])
            result = pd.DataFrame({
                "id": person_id_list,
                "honor_record": person_honor_record_list
            })
            result.to_csv('honor_record_list_' + str(competition_id) + '_' + str(team_id) + '.csv', index=False)
            print(competition_id, team_id)


if __name__ == '__main__':
    main()
