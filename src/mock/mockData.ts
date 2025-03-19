interface IPost {
    id: number;
    userId: number;
    title: string;
    body: string;
}

export interface IPostsResponseData {
    items: IPost[];
    total: number;
}

const mockedData: IPost[] = [
    {
        'userId': 1,
        'id': 1,
        'title': 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
        'body': 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto'
    },
    {
        'userId': 1,
        'id': 2,
        'title': 'qui est esse',
        'body': 'est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla'
    },
    {
        'userId': 2,
        'id': 11,
        'title': 'et ea vero quia laudantium autem',
        'body': 'delectus reiciendis molestiae occaecati non minima eveniet qui voluptatibus\naccusamus in eum beatae sit\nvel qui neque voluptates ut commodi qui incidunt\nut animi commodi'
    },
    {
        'userId': 2,
        'id': 12,
        'title': 'in quibusdam tempore odit est dolorem',
        'body': 'itaque id aut magnam\npraesentium quia et ea odit et ea voluptas et\nsapiente quia nihil amet occaecati quia id voluptatem\nincidunt ea est distinctio odio'
    },
    {
        'userId': 3,
        'id': 21,
        'title': 'asperiores ea ipsam voluptatibus modi minima quia sint',
        'body': 'repellat aliquid praesentium dolorem quo\nsed totam minus non itaque\nnihil labore molestiae sunt dolor eveniet hic recusandae veniam\ntempora et tenetur expedita sunt'
    },
    {
        'userId': 3,
        'id': 22,
        'title': 'dolor sint quo a velit explicabo quia nam',
        'body': 'eos qui et ipsum ipsam suscipit aut\nsed omnis non odio\nexpedita earum mollitia molestiae aut atque rem suscipit\nnam impedit esse'
    },
    {
        'userId': 5,
        'id': 43,
        'title': 'eligendi iste nostrum consequuntur adipisci praesentium sit beatae perferendis',
        'body': 'similique fugit est\nillum et dolorum harum et voluptate eaque quidem\nexercitationem quos nam commodi possimus cum odio nihil nulla\ndolorum exercitationem magnam ex et a et distinctio debitis'
    },
    {
        'userId': 10,
        'id': 96,
        'title': 'quaerat velit veniam amet cupiditate aut numquam ut sequi',
        'body': 'in non odio excepturi sint eum\nlabore voluptates vitae quia qui et\ninventore itaque rerum\nveniam non exercitationem delectus aut'
    },
    {
        'userId': 10,
        'id': 97,
        'title': 'quas fugiat ut perspiciatis vero provident',
        'body': 'eum non blanditiis soluta porro quibusdam voluptas\nvel voluptatem qui placeat dolores qui velit aut\nvel inventore aut cumque culpa explicabo aliquid at\nperspiciatis est et voluptatem dignissimos dolor itaque sit nam'
    },
    {
        'userId': 9,
        'id': 86,
        'title': 'placeat quia et porro iste',
        'body': 'quasi excepturi consequatur iste autem temporibus sed molestiae beatae\net quaerat et esse ut\nvoluptatem occaecati et vel explicabo autem\nasperiores pariatur deserunt optio'
    },
];

export const fetchMockedData = async ({ pagination, sorting, filter }: any): Promise<IPostsResponseData> => {
    return new Promise<IPostsResponseData>((resolve) => {
        setTimeout(() => {
            let filteredData = [ ...mockedData ];

            // filter by userId
            if (filter) {
                filteredData = filteredData.filter((item) => item.userId === Number(filter));
            }

            // sorting by userId
            if (sorting) {
                filteredData.sort((a, b) => {
                    if (a.userId < b.userId) return sorting === 'asc' ? -1 : 1;
                    if (a.userId > b.userId) return sorting === 'asc' ? 1 : -1;
                    return 0;
                });
            }

            // pagination
            const start = (pagination.page - 1) * pagination.pageSize;
            const end = start + pagination.pageSize;
            const paginatedData = filteredData.slice(start, end);

            resolve({ items: paginatedData, total: filteredData.length });
        }, 450);
    });
};