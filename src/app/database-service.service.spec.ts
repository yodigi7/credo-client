import { HttpClient, HttpClientModule, HttpHandler } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";

import { DatabaseServiceService } from "./database-service.service";

describe("DatabaseServiceService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpClient, HttpHandler]
    });
  });

  it("should be created", () => {
    const service: DatabaseServiceService = TestBed.get(DatabaseServiceService);
    expect(service).toBeTruthy();
  });
});
