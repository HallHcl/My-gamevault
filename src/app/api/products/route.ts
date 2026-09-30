import { NextResponse } from 'next/server';
import { getPublicProducts, addProductWithAsset, deleteProduct } from '@/lib/server/db';

export async function GET() {
  try {
    const products = getPublicProducts();
    return NextResponse.json({ success: true, products });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch products', details: String(error) },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { productData, vaultAsset } = body;

    if (!productData || !productData.title || !productData.price) {
      return NextResponse.json(
        { success: false, error: 'กรุณากรอกข้อมูลสินค้าให้ครบถ้วน (ชื่อ, ราคา)' },
        { status: 400 }
      );
    }

    if (!vaultAsset || !vaultAsset.content) {
      return NextResponse.json(
        { success: false, error: 'กรุณากรอกข้อมูลไอดี/ลิงก์สำหรับจัดส่ง (Vault Asset Content)' },
        { status: 400 }
      );
    }

    const createdProduct = addProductWithAsset(productData, vaultAsset);

    return NextResponse.json({
      success: true,
      message: 'เพิ่มสินค้าและบันทึกข้อมูลเข้ารหัสใน Vault เรียบร้อยแล้ว',
      product: createdProduct,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to create product', details: String(error) },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ success: false, error: 'Missing product id' }, { status: 400 });
    }
    deleteProduct(id);
    return NextResponse.json({ success: true, message: 'ลบสินค้าเรียบร้อยแล้ว' });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to delete product', details: String(error) },
      { status: 500 }
    );
  }
}
