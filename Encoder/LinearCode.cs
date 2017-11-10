using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IO;

namespace Linear_code
{
    class Program
    {
        static void Main(string[] args)
        {
            var srcEncoding = Encoding.GetEncoding(1251);
            StreamReader sr = new StreamReader(args[0], encoding: srcEncoding);
            string str = sr.ReadToEnd();
            sr.Close();
            StreamWriter wr = new StreamWriter("encoder_text.txt");
            char[] text_char = str.ToCharArray();
            char[] alphabet = { 'к', 'л', 'м', 'н', 'о', 'п', 'р', 'г', 'д', 'е', 'ё', 'ж', 'з', 'и', 'й', 'с', 'а', 'б', 'в', 'т', 'у', 'щ', 'ъ', 'ы', 'ь', 'э', 'ф', 'х', 'ц', 'ч', 'ш', 'ю', 'я' };
            char[] alphabet2 = { 'К', 'Л', 'М', 'Н', 'О', 'П', 'Р', 'Г', 'Д', 'Е', 'Ё', 'Ж', 'З', 'И', 'Й', 'С', 'А', 'Б', 'В', 'Т', 'У', 'Щ', 'Ъ', 'Ы', 'Ь', 'Э', 'Ф', 'Х', 'Ц', 'Ч', 'Ш', 'Ю', 'Я' };
            int[,] matrix = {
                {5,1 },
                {4,5 }
            };
            int c1, c2;
            for (int i = 0; i < text_char.Length; i++)
            {
                if (text_char[i] == '\n' || text_char[i] == '\r')
                {
                    continue;
                }

                if(text_char[i] == ' ')
                {
                    wr.Write(" ;");
                }
                if (text_char[i] == '.' || text_char[i] == ',')
                {
                    wr.Write(text_char[i]);
                    wr.Write(";");
                    continue;
                }
                int j;
                for (j = 0; j < alphabet.Length; j++)
                {
                    if (text_char[i] == alphabet[j] || text_char[i] == alphabet2[j])
                    {
                        break;
                    }
                }
                c1 = (int)((j + 1) / 10);
                c2 = (j + 1) % 10;
                int d1 = (c1 * matrix[0, 0] + c2 * matrix[1, 0]) % 10;
                int d2 = (c1 * matrix[0, 1] + c2 * matrix[1, 1]) % 10;
                wr.Write(d1);
                wr.Write(d2);
                wr.Write(";");
            }
            wr.Close();
        }
    }
}
