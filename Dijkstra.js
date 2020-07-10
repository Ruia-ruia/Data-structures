#include <iostream>
#include <vector>
#include <ctime>

using std::cout;
using std::cin;
using std::endl;
using std::vector;

//size of graph, max weight of edges
const int size = 10;
const int max_weight = 100;

class node;
class graph;
class priorityq;
class qelem;

class qelem {
  node* item;
  int p;

  public:
    qelem(node* it, int priority) {
        item = it;
        p = priority;
    }

    node* get_item() { return item; }
    int get_priority() { return p; }
};

class priorityq {
  public:
    void set_item(node& n, int p) {
        qelem elem(&n, p);
        bool flag = false;

        for (int i = 0; i < items.size(); ++i) {
            if(items[i].get_priority() > elem.get_priority()) {
                items.insert(items.begin() + i, elem);
                flag = true;
                break;
            }
        }

        if (!flag) {
            items.push_back(elem);
        }
    }

    qelem return_head() {
        qelem n = items[0];
        items.erase(items.begin());
        return n;
    }

    int get_size() { return items.size(); }

    void print_items() {
        for (int i = 0; i < items.size(); ++i) {
            cout << items[i].get_item() << endl;
            cout << items[i].get_priority() << endl;
            cout << "-----------" << endl;
        }
    }

  private:
    vector<qelem> items;
};

class node {
  public:
    node(int id):id(id){};

    void print_neighbours();

    void add_neighbour(int neigh, int weight) {
      vector<int> v;
      v.push_back(neigh);
      v.push_back(weight);
      neighbours.push_back(v); };

    int get_weight(int neighbour_id) {
        for (int i = 0; i < neighbours.size(); ++i) {
            if (neighbours[i][0] == neighbour_id) {
                return neighbours[i][1];
            }
        }
        return -1;
    }

    vector<vector<int> >& get_neighbours() {
        return neighbours;
    }

    int get_id() { return id; }

  private:
    int id;
    vector< vector<int> > neighbours;
};
void node::print_neighbours() {
    for (int i = 0; i < neighbours.size(); ++i) {
        cout << "neighbour: " << neighbours[i][0] <<
                 "| weight: " << neighbours[i][1] << endl;
    }
}

class graph {
  public:
    void add_node(int id) {
      nodes.push_back(node(id)); }

    void add_edge(int id1, int id2, int weight) {
      nodes[id1].add_neighbour(id2, weight);
        nodes[id2].add_neighbour(id1, weight); }

    void print_neighbours_of(int id) {
      nodes[id].print_neighbours(); }

    int get_weight(int id, int neighbour_id) {
        return nodes[id].get_weight(neighbour_id);
    }

    node& resolve_node(int id) {
        return nodes[id];
    }

    vector<int> dijkstra();

  private:
    vector<node> nodes;
};
vector<int> graph::dijkstra() {
    vector<int> backtrace;
    vector<int> dists;
    priorityq pq;
    int curr = 0;

    //set up
    dists.resize(size);
    backtrace.resize(size);
    for (int i = 0; i < backtrace.size(); ++i) { backtrace[i] = -1; }
    backtrace[0] = 0;
    
    pq.set_item(resolve_node(curr), 0);

    dists[curr] = 0;
    for (int i = 1; i < nodes.size(); ++i) {
        dists[i] = 10000;     //effective infinity
    }

    //main loop
    while (pq.get_size()) {
        qelem n = pq.return_head();
        node *currnode = n.get_item();
        int currdist = n.get_priority();
        vector<vector<int> > d = currnode -> get_neighbours();

        for (int i = 0; i < d.size(); ++i) {
            int node = d[i][0];
            int weight = d[i][1];
            int curr_key = n.get_item() -> get_id();
            int adj_key = node;
            vector<int> v;

            int cmp_weight = dists[curr_key] + weight;

            if (cmp_weight < dists[adj_key]) {
                dists[adj_key] = cmp_weight;
                backtrace[adj_key] = cmp_weight;
                pq.set_item(resolve_node(adj_key), cmp_weight);
            }
        }
    }

    return backtrace;
}

//Generate random graph from reference
void gen_graph(graph& new_g) {
    bool** matrix;
    srand(time(0));

    //allocate space for 2D matrix
    matrix = new bool * [size];
    for (int i = 0; i < size; ++i) {
        matrix[i] = new bool[size];
    }

    //initialise boolean connectivity matrix
    for (int i = 0; i < size; ++i) {
        for (int j = i; j < size; ++j) {
            if (i == j) matrix[i][j] = false;
            else matrix[i][j] =
                 matrix[j][i] = ((static_cast<float>(rand())
                              / static_cast<float>(RAND_MAX))
                              < 0.19);
        }
    }

    //generate actual graph with nodes
    //each node with an adjacency list
    for (int i = 0; i < size; ++i) {
        new_g.add_node(i);
    }

    srand(time(0));
    for (int i = 0; i < size; ++i) {
        for (int j = i; j < size; ++j) {
            if (matrix[i][j]) {
                int weight = 1 + (static_cast<int>(rand()) % max_weight);
                new_g.add_edge(i, j, weight);

            }
        }
    }

    //garbage collection
    for (int i = 0; i < size; ++i) delete matrix[i];
    delete [] matrix;
}

int main() {
    graph g;
    gen_graph(g);

    vector<int> res = g.dijkstra();
    for (int i = 0; i < res.size(); ++i) {
        cout << i << ": " << res[i] << endl;
    }

}

