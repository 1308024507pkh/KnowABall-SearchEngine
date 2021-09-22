import requests
from bs4 import BeautifulSoup
import json
import re
import pandas as pd
from selenium import webdriver
from selenium.webdriver.common.by import By

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64'
                  ') AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36',
}


def get_match_data(data):
    match_data = list()
    tds = data.find_elements_by_class_name('td')
    for td in tds:
        record = list()
        spans = td.find_elements_by_tag_name('span')
        for span in spans:
            record.append(span.text)
        match_data.append(record)
    return match_data


def get_person_info(person_id):
    c = webdriver.Chrome(executable_path=r'C:\Users\ht\AppData\Local\Programs\Python\Python36\chromedriver.exe')
    url = 'https://dongqiudi.com/player/%s.html' % person_id
    c.get(url)
    tabs = c.find_element_by_class_name('toggle-tab')
    league_buttons = tabs.find_elements_by_tag_name('b')

    total_con_wrap = c.find_element_by_class_name('total-con-wrap')
    match_data = get_match_data(total_con_wrap)

    league_buttons[1].click()
    league_con_wrap = c.find_element_by_class_name('league-con-wrap')
    match_data_league = get_match_data(league_con_wrap)

    league_buttons[2].click()
    cup_con_wrap = c.find_element_by_class_name('cup-con-wrap')
    match_data_cup = get_match_data(cup_con_wrap)

    league_buttons[3].click()
    international_con_wrap = c.find_element_by_class_name('international-con-wrap')
    match_data_international = get_match_data(international_con_wrap)

    player_infos = {'id': person_id,
                    'match_data': match_data,
                    'match_data_league': match_data_league,
                    'match_data_cup': match_data_cup,
                    'match_data_international': match_data_international}
    c.quit()
    return player_infos


def get_person_list(competition_id, team_id):
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
    print(str(competition_id) + 'person_id_list for ' + str(team_id) + ": " + str(person_id_list))
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
    competition_id_list = [2, 3, 4, 10]
    id_set = [50001053, 50001047, 50001054, 50001059, 50001057, 50001074]
    for competition_id in competition_id_list:
        team_id_list = get_team_list(competition_id)
        for team_id in team_id_list:
            if team_id_list in id_set:
                continue
            person_id_list = get_person_list(competition_id, team_id)
            person_match_data_list = list()
            person_match_data_league_list = list()
            person_match_data_cup_list = list()
            person_match_data_international_list = list()
            for person_id in person_id_list:
                person_info = get_person_info(person_id)
                person_match_data_list.append(person_info["match_data"])
                person_match_data_league_list.append(person_info["match_data_league"])
                person_match_data_cup_list.append(person_info["match_data_cup"])
                person_match_data_international_list.append(person_info["match_data_international"])
            result = pd.DataFrame({
                "id": person_id_list,
                "match_data": person_match_data_list,
                "match_data_league": person_match_data_league_list,
                "match_data_cup": person_match_data_cup_list,
                "match_data_international": person_match_data_international_list
            })
            result.to_csv('match_data_list_' + str(competition_id) + '_' + str(team_id) + '.csv', index=False)


if __name__ == '__main__':
    main()
