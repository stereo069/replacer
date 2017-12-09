using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IO;

namespace FindBGramm
{
    class Program
    {
        static void Main(string[] args)
        {
            FinderBgramm finder = new FinderBgramm();

            finder.FindBGramms("test.txt");
            string jSon = finder.getJsonBGramm();
            StreamWriter wr = new StreamWriter("BGramms.txt");
            wr.Write(jSon.ToCharArray(),0,jSon.Length);
            wr.Close();
        }

        public class ListBG
        {
            public class Node
            {
                public float value;
                public string key;
                public Node next;
                public Node(string key, float value)
                {
                    this.value = value;
                    this.key = key;
                }
            }

            public Node head;

            public ListBG(){
                head = null;
    
            }

            public void Insert(string key, float value)
            {
                Node node = new Node(key, value);
                if (head== null)
                {
                    head = node;
                    return;
                }
                Node currNode = head;
                Node beforeNode = null;
                while(currNode!=null && currNode.value > value)
                {
                    beforeNode = currNode;
                    currNode = currNode.next;
                }
                if (currNode != null)
                {
                    if (beforeNode == null)
                    {
                        node.next = head;
                        head = node;
                    }
                    else
                    {
                        beforeNode.next = node;
                        node.next = currNode;
                    }
                }
                else
                {
                    beforeNode.next = node;
                }
            }

            public string pop()
            {
                string result = "";
                if (head != null)
                {
                    result += "\""+head.key +"\" : \""+  Math.Round(head.value,4).ToString()+"\"";
                    head = head.next;
                    if (head != null)
                        result += ",\n";
                }
                return result;
            }

        }

        public class FinderBgramm
        {
            string A;
            Dictionary<string,float> BGramm;
            float count;
            public FinderBgramm()
            {
                A = "абвгдеёжзийклмнопрстуфхцчшщъыьэюя";
                BGramm = new Dictionary<string, float>();
                count = 0;
                CreateBGramm();
            }

            private void CreateBGramm()
            {
                for(int i = 0; i < A.Length; i++)
                {
                    for(int j = 0; j < A.Length; j++)
                    {
                        string key = Char.ToString(A[i])+Char.ToString(A[j]);                
                        BGramm.Add(key,0);
                    }
                }
            }

            public void FindBGramms(string fileName)
            {
                var srcEncoding = Encoding.GetEncoding(1251);
                StreamReader sr = new StreamReader(fileName, encoding: srcEncoding);
                string str = sr.ReadToEnd();
                sr.Close();
                
                for(int i = 1; i < str.Length; i++)
                {
                    if(Char.IsLetter(str[i]) && Char.IsLetter(str[i - 1]))
                    {
                        string key = Char.ToString(str[i - 1]) + Char.ToString(str[i]);
                        key = key.ToLower();
                        if (BGramm.ContainsKey(key))
                        {
                            float value = 0;
                            if(BGramm.TryGetValue(key,out value))
                            {
                                value++;
                                BGramm.Remove(key);
                                BGramm.Add(key, value);
                                count++;
                            }
                        }
                    }
                }
            }

            public string getJsonBGramm()
            {
                string json = "{\n";
                ListBG list = new ListBG();
                for (int i = 0; i < A.Length; i++)
                {
                    for (int j = 0; j < A.Length; j++)
                    {
                        string key = Char.ToString(A[i]) + Char.ToString(A[j]);
                        float value;
                        if (BGramm.TryGetValue(key, out value))
                        {
                            if (value == 0)
                            {
                                //list.Insert(key,-1);
                            }
                            else
                            {
                                float q = value / count;
                                list.Insert(key, q * 100);
                            }
                        }
                    }
                }
                string item = "";
                do
                {
                    item = list.pop();
                    json += item;
                } while (item != "");
                json += "}";
                return json;
            }

        };

    }
}
