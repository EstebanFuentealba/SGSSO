using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WCF_ENAP.WS
{
    public class JSONCollection<T>
    {
        private T _items;
        private int _count;
		private bool _success;

        public T items
        {
            get
            {
                return _items;
            }
            set
            {
                _items = value;
            }
        }

        public int totalCount
        {
            get
            {
                return this._count;
            }
            set
            {
                this._count = value;
            }
        }
		public bool success
        {
            get
            {
                return this._success;
            }
            set
            {
                this._success = value;
            }
        }

    }
}