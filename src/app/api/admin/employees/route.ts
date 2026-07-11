import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { sanitizeRichText } from "@/lib/rich-text";
import { slugify } from "@/lib/utils";
import { employeeSchema } from "@/lib/validations";

async function assertEditor() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ error: "DATABASE_URL is not configured." }, { status: 500 });
  }
  return session;
}

export async function POST(request: Request) {
  const auth = await assertEditor();
  if (auth instanceof NextResponse) {
    return auth;
  }

  try {
    const payload = employeeSchema.parse(await request.json());
    await prisma.employee.create({
      data: {
        name: payload.name,
        slug: slugify(payload.name),
        employeeNumber: payload.employeeNumber || null,
        designation: payload.designation || null,
        photoUrl: payload.photoUrl || null,
        dob: new Date(payload.dob),
        personalEmail: payload.personalEmail,
        phone: payload.phone || null,
        startDate: new Date(payload.startDate),
        endDate: payload.endDate ? new Date(payload.endDate) : null,
        dutiesHtml: sanitizeRichText(payload.dutiesHtml),
        isActive: payload.isActive,
      },
    });
    revalidatePath("/registry");
    revalidatePath("/admin");
    return NextResponse.json({ message: "Employee created." });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to create employee." },
      { status: 400 },
    );
  }
}

export async function PATCH(request: Request) {
  const auth = await assertEditor();
  if (auth instanceof NextResponse) {
    return auth;
  }

  try {
    const payload = employeeSchema.parse(await request.json());
    if (!payload.id) {
      return NextResponse.json({ error: "Employee id is required." }, { status: 400 });
    }

    await prisma.employee.update({
      where: { id: payload.id },
      data: {
        name: payload.name,
        slug: slugify(payload.name),
        employeeNumber: payload.employeeNumber || null,
        designation: payload.designation || null,
        photoUrl: payload.photoUrl || null,
        dob: new Date(payload.dob),
        personalEmail: payload.personalEmail,
        phone: payload.phone || null,
        startDate: new Date(payload.startDate),
        endDate: payload.endDate ? new Date(payload.endDate) : null,
        dutiesHtml: sanitizeRichText(payload.dutiesHtml),
        isActive: payload.isActive,
      },
    });
    revalidatePath("/registry");
    revalidatePath("/admin");
    return NextResponse.json({ message: "Employee updated." });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to update employee." },
      { status: 400 },
    );
  }
}

export async function DELETE(request: Request) {
  const auth = await assertEditor();
  if (auth instanceof NextResponse) {
    return auth;
  }

  const { id } = (await request.json()) as { id?: string };
  if (!id) {
    return NextResponse.json({ error: "Employee id is required." }, { status: 400 });
  }

  await prisma.employee.delete({ where: { id } });
  revalidatePath("/registry");
  revalidatePath("/admin");
  return NextResponse.json({ message: "Employee deleted." });
}
