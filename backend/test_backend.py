import unittest
import app

class BackendTestCase(unittest.TestCase):
    def setUp(self):
        self.app = app.app.test_client()
        self.app.testing = True

    def test_get_customer_info(self):
        response = self.app.get('/api/customer/12345')
        self.assertEqual(response.status_code, 200)
        self.assertIn('name', response.get_json())
        
    def test_get_customer_not_found(self):
        response = self.app.get('/api/customer/99999')
        self.assertEqual(response.status_code, 404)
        
    def test_get_usage_info(self):
        response = self.app.get('/api/usage/12345')
        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertIn('data_usage', data)
        self.assertIn('minutes_usage', data)
        
    def test_get_invoice_info(self):
        response = self.app.get('/api/invoice/12345')
        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertIn('invoices', data)

if __name__ == '__main__':
    unittest.main()