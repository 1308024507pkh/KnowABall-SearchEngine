import requests
from bs4 import BeautifulSoup
import json
import re
import pandas as pd

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64'
                  ') AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36',
}


def get_person_news_title(person_id):
    url = "https://dongqiudi.com/player/" + str(person_id) + ".html"
    response = requests.get(url, headers=headers)  # 提交请求
    if response.status_code == 200:
        response.encoding = 'utf-8'
    if response.status_code == 404:
        return None

    player_infos = {"person_id": person_id}
    soup = BeautifulSoup(response.text, 'lxml')
    player_content = soup.find(name="div", class_="player-con")
    player_info = player_content.find(name="div", class_="player-info")
    img = player_info.find(name="img", class_="player-photo")
    img_url = img['src']

    player_infos['img_url'] = img_url
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
    competition_id_list = [2]
    for competition_id in competition_id_list:
        team_id_list = get_team_list(competition_id)
        for team_id in team_id_list:
            already_list = [50001038, 50001039, 50001040, 50001042, 50001043, 50001044, 50001045, 50001047,
                            50001053, 50001068, 50001074, 50001075, 50004293, 50001057, 50001086, 50001054,
                            50001066, 50001100,
                            50001758, 50001759, 50001761, 50001780, 50001776, 50001782, 50001764, 50001755,
                            50001756, 50001778, 50005095, 50001775, 50001772, 50001771, 50001766, 50001767,
                            50001762, 50001760, 50001754, 50000804, 50008568, 50000807, 50000811, 50000822,
                            50000806, 50000860, 50000814, 50000805, 50000813, 50001793, 50000842, 50000841,
                            50000820, 50000817, 50000819, 50000823, 50000808, 50000829, 50000763, 50000730,
                            50000746, 50000736, 50000767, 50000761, 50000752, 50000741, 50000734, 50000740,
                            50000751, 50000739, 50000729, 50000735, 50000731, 50000766, 50000737, 50000738,
                            50000743, 50000759]
            if team_id in already_list:
                continue
            print(competition_id, team_id)
            person_id_list = get_person_list(team_id)
            person_img_url_list = list()
            for person_id in person_id_list:
                person_info = get_person_news_title(person_id)
                person_img_url_list.append(person_info["img_url"])
            result = pd.DataFrame({
                "id": person_id_list,
                "img_url": person_img_url_list
            })
            result.to_csv('person_img_url_list_' + str(competition_id) + '_' + str(team_id) + '.csv', index=False)


if __name__ == '__main__':
    main()
