---
spec_id: admin/beckhoff-tf6771
schema_version: ai4av-public-spec-v1
revision: 1
title: "Beckhoff TF6771 IoT OCPP Control Spec"
manufacturer: Beckhoff
model_family: TF6771
aliases: []
compatible_with:
  manufacturers:
    - Beckhoff
  models:
    - TF6771
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - download.beckhoff.com
  - github.com
source_urls:
  - https://download.beckhoff.com/download/Document/automation/twincat3/TF6771_TC3_IoT_OCPP_EN.pdf
  - https://github.com/Beckhoff/TF6771_Samples
retrieved_at: 2026-08-11T09:27:55.899Z
last_checked_at: 2026-08-19T08:59:11.701Z
generated_at: 2026-08-19T08:59:11.701Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "OCPP 2.0.1 JSON support is listed as \"To follow\" in the source — not yet implemented in this revision."
  - "SOAP/OCPP 1.6S is explicitly NOT supported."
  - "source provides no hardware specifications (voltage, current, power); TF6771 is software, executed on a Beckhoff IPC."
  - "source contains no explicit safety warnings, interlocks, or power-on sequencing requirements specific to TF6771 itself. (One implementation note in §4.4: \"For reasons of simplicity, security is not taken into account in this Quick Start. In real applications, secure implementation should always be a central component of the considerations.\" - this is a documentation caveat, not a device-side interlock.)"
  - "full enumeration of E_OCPP1_AuthenticationMode values (source mentions None; other variants not surfaced in refined excerpt)."
  - "full enumeration of E_OCPP_EncryptionMode values (source mentions None; other variants not surfaced in refined excerpt)."
  - "full enumeration of E_OCPP1_MessageTrigger values for TriggerMessage."
  - "full enumeration of E_OCPP1_Reason values for StopTransaction (source shows subset: None, EmergencyStop, EVDisconnected, HardReset, Local, Other, PowerLoss, Reboot, Remote, SoftReset, UnlockCommand — verify against complete type table in §5.2 of source)."
  - "full enumeration of E_OCPP1_AuthorizationStatus, E_OCPP1_RegistrationStatus, E_OCPP1_ResetType, E_OCPP1_UnlockStatus, E_OCPP1_UpdateType, E_OCPP1_UpdateStatus, E_OCPP1_ClearCacheStatus, E_OCPP1_ClearChargingProfileStatus, E_OCPP1_ConfigurationStatus, E_OCPP1_GetCompositeScheduleStatus, E_OCPP1_TriggerMessageStatus, E_OCPP1_ReservationStatus, E_OCPP1_CancelReservationStatus, E_OCPP1_DataTransferStatus, E_OCPP1_DiagnosticsStatus, E_OCPP1_FirmwareStatus, E_OCPP1_Error, E_OCPP1_ResetStatus, E_OCPP1_AvailabilityStatus, E_OCPP1_ChargingProfilePurposeType, E_OCPP1_ChargingRateUnitType, E_OCPP1_ChargingProfileStatus, E_OCPP1_RemoteStartStopStatus — only Action enum and a partial set of values surfaced in the refined excerpt. Refer to §5.2 Data types of the source manual for the canonical tables."
verification:
  verdict: verified
  checked_at: 2026-08-19T08:59:11.701Z
  matched_actions: 29
  action_count: 29
  confidence: medium
  summary: "All 29 spec OCPP 1.6 message actions match Beckhoff Send/Recv/Resp methods in the source; transport port/path/auth confirmed. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-08-11
---

# Beckhoff TF6771 IoT OCPP Control Spec

## Summary
The Beckhoff TF6771 IoT OCPP is a TwinCAT 3 PLC software function (driver `TcIotOcpp.tmx` + PLC library `Tc3_OCPP`) that lets a TwinCAT controller act as an OCPP 1.6J (JSON over WebSockets) client, server, gateway, or retrofit bridge to a Charging Station Management System (CSMS). Communication runs over a TCP WebSockets connection; both peer directions (client→server and server→client) are supported.

<!-- UNRESOLVED: OCPP 2.0.1 JSON support is listed as "To follow" in the source — not yet implemented in this revision. -->
<!-- UNRESOLVED: SOAP/OCPP 1.6S is explicitly NOT supported. -->
<!-- UNRESOLVED: source provides no hardware specifications (voltage, current, power); TF6771 is software, executed on a Beckhoff IPC. -->

## Transport
```yaml
protocols:
  - tcp  # OCPP over WebSockets
addressing:
  port: 8080  # from example in source (§4.4); OCPP spec does not fix a default port
  base_url: "/ocpp"  # sPath example from source (§4.4); OCPP spec does not fix a default path
auth:
  type: none  # Quick Start example uses E_OCPP1_AuthenticationMode.None / E_OCPP_EncryptionMode.None; production deployments may use TLS + OCPP Basic Authentication (T_OCPP_Hash) via OCPP1_Server_Param
  notes: |
    Source documents three server-side auth modes via E_OCPP1_AuthenticationMode (None observed in Quick Start example; full enumeration in §5.1.1.7 / §5.1.2 enumerates the modes but does not name every variant in the refined excerpt). Encryption modes via E_OCPP_EncryptionMode (None observed in example; OCPP spec allows TLS).
    OCPP Basic Authentication uses an authorization hash derived from identity + password - see source §5.1.2.1 CreateStation / §5.1.3 CreateStation + "Hash calculation" appendix reference.
```

## Traits
```yaml
- powerable       # source documents remote Start/Stop Transaction (power flow to EV) - inferred from OCPP transaction lifecycle
- queryable       # source documents StatusNotification, BootNotification, MeterValue, Heartbeat, GetConfiguration queries - inferred from query/method pairs
- routable        # N/A: TF6771 is an OCPP peer (client/server), not a signal-routing device
```

## Actions
```yaml
# Each entry below corresponds to one OCPP 1.6 message / function-block method documented in the source.
# The TF6771 surfaces the OCPP 1.6 message set through three function blocks (FB_OCPP1_Client, FB_OCPP1_Server, FB_OCPP1_Station).
# Verbatim JSON message names from the OCPP 1.6 specification are used in `command:` so that any JSON-OCPP 1.6 client/server stack can replay them.

# --- Client-initiated actions (FB_OCPP1_Client) ---
- id: send_authorize
  label: Authorize
  kind: action
  command: "Authorize"
  params:
    - name: idTag
      type: string
      description: IdToken presented by the user for authorization

- id: send_boot_notification
  label: BootNotification
  kind: action
  command: "BootNotification"
  notes: |
    Sent automatically by the client on connect unless overridden by InitBootInfo (§5.1.1.5).
    Payload fields per source §5.1.1.5 / §5.1.2.8: chargePointModel, chargePointVendor,
    chargeBoxSerialNumber, chargePointSerialNumber, firmwareVersion, meterSerialNumber, meterType.

- id: send_data_transfer
  label: DataTransfer
  kind: action
  command: "DataTransfer"
  params:
    - name: vendorId
      type: string
      description: Vendor identifier
    - name: messageId
      type: string
      description: Optional additional message identifier

- id: send_diagnostics_status_notification
  label: DiagnosticsStatusNotification
  kind: action
  command: "DiagnosticsStatusNotification"
  params:
    - name: status
      type: enum
      description: E_OCPP1_DiagnosticsStatus value (Idle, Uploading, Uploaded, UploadFailed, Downloading, Downloaded, DownloadFailed)

- id: send_firmware_status_notification
  label: FirmwareStatusNotification
  kind: action
  command: "FirmwareStatusNotification"
  params:
    - name: status
      type: enum
      description: E_OCPP1_FirmwareStatus value (Downloaded, DownloadFailed, Downloading, DownloadScheduled, DownloadPaused, Idle, InstallFailed, Installing, Installed)

- id: send_heartbeat
  label: Heartbeat
  kind: action
  command: "Heartbeat"
  notes: |
    Internal Heartbeat is sent automatically by the client (interval via HeartbeatInterval Property, §5.1.1).
    Server can override the interval in BootNotification.conf.

- id: send_meter_values
  label: MeterValues
  kind: action
  command: "MeterValues"
  params:
    - name: connectorId
      type: integer
      description: EVSE connector id
    - name: transactionId
      type: integer
      description: Optional transaction id
    - name: sampledValues
      type: array
      description: SampledValue entries (Wh, W, A, V, etc. per OCPP 1.6)

- id: send_security_event_notification
  label: SecurityEventNotification
  kind: action
  command: "SecurityEventNotification"
  params:
    - name: type
      type: string
      description: Security event type per OCPP 1.6
    - name: info
      type: string
      description: Optional additional info

- id: send_start_transaction
  label: StartTransaction
  kind: action
  command: "StartTransaction"
  params:
    - name: idTag
      type: string
      description: IdToken authorizing the transaction
    - name: connectorId
      type: integer
      description: EVSE connector id
    - name: meterStart
      type: integer
      description: Meter value (Wh) at transaction start

- id: send_status_notification
  label: StatusNotification
  kind: action
  command: "StatusNotification"
  params:
    - name: connectorId
      type: integer
      description: EVSE connector id
    - name: error
      type: enum
      description: E_OCPP1_ChargePointError (ConnectorLockFailure, EVCommunicationError, GroundFailure, HighTemperature, InternalError, LocalListConflict, NoError, OverCurrentFailure, OverVoltage, PowerMeterFailure, PowerSwitchFailure, ReaderFailure, ResetFailure, UnderVoltage, WeakSignal)
    - name: status
      type: enum
      description: E_OCPP1_ChargePointStatus (Available, Preparing, Charging, SuspendedEV, SuspendedEVSE, Finishing, Reserved, Unavailable, Faulted)

- id: send_stop_transaction
  label: StopTransaction
  kind: action
  command: "StopTransaction"
  params:
    - name: idTag
      type: string
      description: Optional idTag
    - name: transactionId
      type: integer
      description: Transaction id from StartTransaction.conf
    - name: connectorId
      type: integer
      description: EVSE connector id
    - name: meterStop
      type: integer
      description: Meter value (Wh) at transaction end
    - name: reason
      type: enum
      description: E_OCPP1_Reason (None, EmergencyStop, EVDisconnected, HardReset, Local, Other, PowerLoss, Reboot, Remote, SoftReset, UnlockCommand)

# --- Server→Client requests (FB_OCPP1_Client receives, FB_OCPP1_Server sends) ---
- id: recv_cancel_reservation
  label: CancelReservation
  kind: action
  command: "CancelReservation"
  params:
    - name: reservationId
      type: integer
      description: Reservation id to cancel

- id: recv_change_availability
  label: ChangeAvailability
  kind: action
  command: "ChangeAvailability"
  params:
    - name: connectorId
      type: integer
      description: EVSE connector id
    - name: type
      type: enum
      description: E_OCPP1_AvailabilityType (Inoperative, Operative)

- id: recv_change_configuration
  label: ChangeConfiguration
  kind: action
  command: "ChangeConfiguration"
  params:
    - name: key
      type: string
      description: Configuration key
    - name: value
      type: string
      description: New value

- id: recv_clear_cache
  label: ClearCache
  kind: action
  command: "ClearCache"

- id: recv_clear_charging_profile
  label: ClearChargingProfile
  kind: action
  command: "ClearChargingProfile"
  params:
    - name: profileId
      type: integer
      description: Optional profile id filter
    - name: connectorId
      type: integer
      description: Optional connector id filter
    - name: chargingProfilePurpose
      type: enum
      description: E_OCPP1_ChargingProfilePurposeType (ChargePointMaxProfile, TxDefaultProfile, TxProfile)
    - name: stackLevel
      type: integer
      description: Optional stack level filter

- id: recv_get_composite_schedule
  label: GetCompositeSchedule
  kind: action
  command: "GetCompositeSchedule"
  params:
    - name: connectorId
      type: integer
      description: EVSE connector id
    - name: duration
      type: integer
      description: Time window in seconds
    - name: chargingRateUnit
      type: enum
      description: E_OCPP1_ChargingRateUnitType (A, W)

- id: recv_get_configuration
  label: GetConfiguration
  kind: action
  command: "GetConfiguration"
  params:
    - name: keys
      type: array
      description: Optional list of configuration keys to query

- id: recv_get_diagnostics
  label: GetDiagnostics
  kind: action
  command: "GetDiagnostics"
  params:
    - name: location
      type: string
      description: URI to upload the diagnostic file to
    - name: retries
      type: integer
      description: Optional retry count
    - name: retryInterval
      type: integer
      description: Optional seconds between retries
    - name: startTime
      type: string
      description: Optional UTC start time (ISO 8601)
    - name: stopTime
      type: string
      description: Optional UTC stop time (ISO 8601)

- id: recv_get_local_list_version
  label: GetLocalListVersion
  kind: action
  command: "GetLocalListVersion"

- id: recv_send_local_list
  label: SendLocalList
  kind: action
  command: "SendLocalList"
  params:
    - name: listVersion
      type: integer
      description: Version number of the new list
    - name: updateType
      type: enum
      description: E_OCPP1_UpdateType (Differential, Full)

- id: recv_remote_start_transaction
  label: RemoteStartTransaction
  kind: action
  command: "RemoteStartTransaction"
  params:
    - name: connectorId
      type: integer
      description: Optional connector id
    - name: idTag
      type: string
      description: IdToken to authorize

- id: recv_remote_stop_transaction
  label: RemoteStopTransaction
  kind: action
  command: "RemoteStopTransaction"
  params:
    - name: transactionId
      type: integer
      description: Transaction id to stop

- id: recv_reserve_now
  label: ReserveNow
  kind: action
  command: "ReserveNow"
  params:
    - name: connectorId
      type: integer
      description: EVSE connector id to reserve
    - name: expiryDate
      type: string
      description: UTC expiry time (ISO 8601)
    - name: idTag
      type: string
      description: IdToken the reservation is for
    - name: parentIdTag
      type: string
      description: Optional parent id tag
    - name: reservationId
      type: integer
      description: Unique reservation id

- id: recv_reset
  label: Reset
  kind: action
  command: "Reset"
  params:
    - name: type
      type: enum
      description: E_OCPP1_ResetType (Hard, Soft)

- id: recv_set_charging_profile
  label: SetChargingProfile
  kind: action
  command: "SetChargingProfile"
  params:
    - name: connectorId
      type: integer
      description: EVSE connector id
    - name: chargingProfile
      type: object
      description: ST_OCPP1_ChargingProfileMax per OCPP 1.6 (chargingProfileId, stackLevel, chargingProfilePurpose, chargingProfileKind, recurrencyKind, chargingSchedule)

- id: recv_trigger_message
  label: TriggerMessage
  kind: action
  command: "TriggerMessage"
  params:
    - name: requestedMessage
      type: enum
      description: E_OCPP1_MessageTrigger - one of the OCPP 1.6 messages the Charge Point can be asked to send
    - name: connectorId
      type: integer
      description: Optional connector id scope

- id: recv_unlock_connector
  label: UnlockConnector
  kind: action
  command: "UnlockConnector"
  params:
    - name: connectorId
      type: integer
      description: EVSE connector id

- id: recv_update_firmware
  label: UpdateFirmware
  kind: action
  command: "UpdateFirmware"
  params:
    - name: location
      type: string
      description: URI to obtain the firmware from
    - name: retries
      type: integer
      description: Optional retry count
    - name: retryInterval
      type: integer
      description: Optional seconds between retries
    - name: retrieveDate
      type: string
      description: UTC time the Charge Point may fetch the firmware (ISO 8601)
```

## Feedbacks
```yaml
# Each corresponds to a documented OCPP CALLRESULT / CALLERROR returned to a request above.
# Values mirror the enum types referenced in the source.

- id: authorization_status
  type: enum
  values: [Accepted, Blocked, Expired, Invalid, ConcurrentTx]
  description: E_OCPP1_AuthorizationStatus returned by Authorize.conf / StartTransaction.conf / StopTransaction.conf

- id: boot_registration_status
  type: enum
  values: [Accepted, Pending, Rejected]
  description: E_OCPP1_RegistrationStatus returned by BootNotification.conf

- id: heartbeat_interval
  type: string
  description: Heartbeat interval (TIME, e.g. T#5S) returned by BootNotification.conf when registration is Accepted (§5.1.2.21)

- id: cancel_reservation_status
  type: enum
  description: E_OCPP1_CancelReservationStatus returned by CancelReservation.conf

- id: availability_status
  type: enum
  description: E_OCPP1_AvailabilityStatus returned by ChangeAvailability.conf

- id: configuration_status
  type: enum
  description: E_OCPP1_ConfigurationStatus returned by ChangeConfiguration.conf

- id: clear_cache_status
  type: enum
  description: E_OCPP1_ClearCacheStatus returned by ClearCache.conf

- id: clear_charging_profile_status
  type: enum
  description: E_OCPP1_ClearChargingProfileStatus returned by ClearChargingProfile.conf

- id: data_transfer_status
  type: enum
  description: E_OCPP1_DataTransferStatus returned by DataTransfer.conf

- id: get_composite_schedule_status
  type: enum
  description: E_OCPP1_GetCompositeScheduleStatus returned by GetCompositeSchedule.conf

- id: get_composite_schedule
  type: object
  description: Schedule (chargingSchedule, scheduleStart, connectorId) returned by GetCompositeSchedule.conf

- id: get_configuration_keys
  type: array
  description: List of {key, value, readonly} returned by GetConfiguration.conf

- id: get_configuration_unknown_keys
  type: array
  description: Unknown key names returned by GetConfiguration.conf

- id: get_diagnostics_file_name
  type: string
  description: Diagnostic file name returned by GetDiagnostics.conf

- id: get_local_list_version
  type: integer
  description: Current Local Authorization List version returned by GetLocalListVersion.conf

- id: local_list_update_status
  type: enum
  description: E_OCPP1_UpdateStatus returned by SendLocalList.conf

- id: remote_start_stop_status
  type: enum
  description: E_OCPP1_RemoteStartStopStatus returned by RemoteStartTransaction.conf / RemoteStopTransaction.conf

- id: reservation_status
  type: enum
  description: E_OCPP1_ReservationStatus returned by ReserveNow.conf

- id: reset_status
  type: enum
  description: E_OCPP1_ResetStatus returned by Reset.conf

- id: charging_profile_status
  type: enum
  description: E_OCPP1_ChargingProfileStatus returned by SetChargingProfile.conf

- id: transaction_id
  type: integer
  description: Transaction id returned by StartTransaction.conf

- id: trigger_message_status
  type: enum
  description: E_OCPP1_TriggerMessageStatus returned by TriggerMessage.conf

- id: unlock_status
  type: enum
  description: E_OCPP1_UnlockStatus returned by UnlockConnector.conf

- id: charge_point_error
  type: enum
  values: [ConnectorLockFailure, EVCommunicationError, GroundFailure, HighTemperature, InternalError, LocalListConflict, NoError, OverCurrentFailure, OverVoltage, PowerMeterFailure, PowerSwitchFailure, ReaderFailure, ResetFailure, UnderVoltage, WeakSignal]
  description: E_OCPP1_ChargePointError returned in StatusNotification

- id: charge_point_status
  type: enum
  values: [Available, Preparing, Charging, SuspendedEV, SuspendedEVSE, Finishing, Reserved, Unavailable, Faulted]
  description: E_OCPP1_ChargePointStatus returned in StatusNotification

- id: ocpp_error
  type: enum
  description: E_OCPP1_Error returned via RespError on internal-error path (§5.1.2.24)
```

## Variables
```yaml
# Configurable settings exposed by the source via ST_OCPP1_Client_Param / ST_OCPP1_Server_Param / InitOptions / InitSettings.
# Source names and types only; values must be supplied by the integrator.

- id: client_host
  type: string
  description: sHost - server address the client connects to (ST_OCPP1_Client_Param)

- id: client_port
  type: integer
  description: nPort - TCP port the client connects to (ST_OCPP1_Client_Param)

- id: client_identity
  type: string
  description: sIdentity - client identity used for OCPP Basic Authentication (ST_OCPP1_Client_Param)

- id: client_path
  type: string
  description: sPath - WebSocket path on the server (ST_OCPP1_Client_Param)

- id: heartbeat_interval
  type: string
  description: TIME - internal Heartbeat interval (FB_OCPP1_Client.HeartbeatInterval Property); server can override via BootNotification.conf

- id: server_port
  type: integer
  description: nPort - TCP port the server listens on (ST_OCPP1_Server_Param)

- id: server_auth_mode
  type: enum
  description: eAuthMode - E_OCPP1_AuthenticationMode used by the server (ST_OCPP1_Server_Param); None observed in Quick Start example

- id: server_encryption_mode
  type: enum
  description: eEncryptionMode - E_OCPP_EncryptionMode used by the server (ST_OCPP1_Server_Param); None observed in Quick Start example

- id: debug_level
  type: enum
  description: eDebugLevel - E_OCPP_DebugLevel (None, MessageLogFile) controlling logfile output

- id: trace_level
  type: enum
  description: eTraceLevel - TcTraceLevel (tlAlways, tlError, tlWarning, tlInfo, tlVerbose) controlling TwinCAT Output verbosity
```

## Events
```yaml
# Unsolicited server-side callbacks enumerated in the source. Each represents an incoming
# CALL message the local peer must service via PollRequest.

- id: server_request_authorize
  trigger: OCPP CALL "Authorize"
  source: server_initiated
  description: Server-initiated authorization request (RecvAuthorize on FB_OCPP1_Server / FB_OCPP1_Station)

- id: server_request_boot_notification
  trigger: OCPP CALL "BootNotification"
  source: client_initiated
  description: Boot notification sent automatically by the client on connect

- id: server_request_data_transfer
  trigger: OCPP CALL "DataTransfer"
  source: bidirectional
  description: Vendor-specific payload exchange

- id: server_request_diagnostics_status_notification
  trigger: OCPP CALL "DiagnosticsStatusNotification"
  source: client_initiated
  description: Diagnostic upload status report

- id: server_request_firmware_status_notification
  trigger: OCPP CALL "FirmwareStatusNotification"
  source: client_initiated
  description: Firmware install status report

- id: server_request_heartbeat
  trigger: OCPP CALL "Heartbeat"
  source: client_initiated
  description: Periodic keepalive

- id: server_request_meter_values
  trigger: OCPP CALL "MeterValues"
  source: client_initiated
  description: Meter sample report (may be empty for vendor compatibility)

- id: server_request_security_event_notification
  trigger: OCPP CALL "SecurityEventNotification"
  source: client_initiated
  description: Security event report

- id: server_request_start_transaction
  trigger: OCPP CALL "StartTransaction"
  source: client_initiated
  description: Transaction begin

- id: server_request_status_notification
  trigger: OCPP CALL "StatusNotification"
  source: client_initiated
  description: Connector status / error report

- id: server_request_stop_transaction
  trigger: OCPP CALL "StopTransaction"
  source: client_initiated
  description: Transaction end
```

## Macros
```yaml
# Multi-step sequences the source documents as canonical flows.

- id: charging_session
  label: Charging Session (sample)
  steps:
    - action: send_authorize
      note: IdTag presented by user
    - action: send_start_transaction
      note: Returns transactionId from server
    - action: send_meter_values
      note: Cyclic during charging
    - action: send_stop_transaction
      note: Includes meterStop ≥ meterStart
  source: §4.4 Quick Start, sample OCPP client

- id: client_connect
  label: Client Connect / Disconnect
  steps:
    - action: init_boot_info
      note: Optional - sets BootNotification payload
    - action: execute
      note: bConnect=TRUE opens WebSocket; FALSE closes it
  source: §5.1.1.1 Execute, §5.1.1.5 InitBootInfo
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings, interlocks, or power-on sequencing requirements specific to TF6771 itself. (One implementation note in §4.4: "For reasons of simplicity, security is not taken into account in this Quick Start. In real applications, secure implementation should always be a central component of the considerations." - this is a documentation caveat, not a device-side interlock.)
```

## Notes
- TF6771 is a TwinCAT 3 software function, not a standalone hardware product. The "device" is a Beckhoff IPC running TwinCAT 3.1 Build 4026.3 or higher on Windows 10, TwinCAT/BSD, or TwinCAT/Beckhoff RT Linux; target platform PC architecture (x86, x64, ARM).
- Source explicitly states OCPP 1.6J (JSON over WebSockets) is supported; OCPP 2.0.1J is "To follow"; OCPP 1.6S (SOAP) is NOT supported (§4.3).
- Quick Start example uses port 8080 and path `ocpp`. These are example values from the Beckhoff source — the OCPP 1.6 specification does not fix a default port or path.
- Auth mode and encryption mode default to `None` in the Quick Start example. Production deployments should configure E_OCPP1_AuthenticationMode and E_OCPP_EncryptionMode (TLS) appropriately; OCPP Basic Authentication requires an identity + password hash via the source's "Hash calculation" appendix.
- Function blocks exposed: FB_OCPP1_Client (OCPP client), FB_OCPP1_Server (1-to-many OCPP server), FB_OCPP1_Station (1-to-1 OCPP server peer). All three share the same message surface.
- Logging: TF6771 supports TwinCAT Output tracing (TcTraceLevel enum) and optional message logfile in `C:\ProgramData\Beckhoff\TwinCAT\3.1\Boot\`. The logfile is intended for debugging only — OCPP messages are logged in full and grow over time.
- TwinCAT 3 license: TF6771 TC3 IoT OCPP, full or 7-day test version, activated via the TwinCAT 3 development environment (XAE).
- Distribution: TF6771 is installed only on the engineering side; the TMX driver is copied to the target system with the project files.

<!-- UNRESOLVED: full enumeration of E_OCPP1_AuthenticationMode values (source mentions None; other variants not surfaced in refined excerpt). -->
<!-- UNRESOLVED: full enumeration of E_OCPP_EncryptionMode values (source mentions None; other variants not surfaced in refined excerpt). -->
<!-- UNRESOLVED: full enumeration of E_OCPP1_MessageTrigger values for TriggerMessage. -->
<!-- UNRESOLVED: full enumeration of E_OCPP1_Reason values for StopTransaction (source shows subset: None, EmergencyStop, EVDisconnected, HardReset, Local, Other, PowerLoss, Reboot, Remote, SoftReset, UnlockCommand — verify against complete type table in §5.2 of source). -->
<!-- UNRESOLVED: full enumeration of E_OCPP1_AuthorizationStatus, E_OCPP1_RegistrationStatus, E_OCPP1_ResetType, E_OCPP1_UnlockStatus, E_OCPP1_UpdateType, E_OCPP1_UpdateStatus, E_OCPP1_ClearCacheStatus, E_OCPP1_ClearChargingProfileStatus, E_OCPP1_ConfigurationStatus, E_OCPP1_GetCompositeScheduleStatus, E_OCPP1_TriggerMessageStatus, E_OCPP1_ReservationStatus, E_OCPP1_CancelReservationStatus, E_OCPP1_DataTransferStatus, E_OCPP1_DiagnosticsStatus, E_OCPP1_FirmwareStatus, E_OCPP1_Error, E_OCPP1_ResetStatus, E_OCPP1_AvailabilityStatus, E_OCPP1_ChargingProfilePurposeType, E_OCPP1_ChargingRateUnitType, E_OCPP1_ChargingProfileStatus, E_OCPP1_RemoteStartStopStatus — only Action enum and a partial set of values surfaced in the refined excerpt. Refer to §5.2 Data types of the source manual for the canonical tables. -->

## Provenance

```yaml
source_domains:
  - download.beckhoff.com
  - github.com
source_urls:
  - https://download.beckhoff.com/download/Document/automation/twincat3/TF6771_TC3_IoT_OCPP_EN.pdf
  - https://github.com/Beckhoff/TF6771_Samples
retrieved_at: 2026-08-11T09:27:55.899Z
last_checked_at: 2026-08-19T08:59:11.701Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-19T08:59:11.701Z
matched_actions: 29
action_count: 29
confidence: medium
summary: "All 29 spec OCPP 1.6 message actions match Beckhoff Send/Recv/Resp methods in the source; transport port/path/auth confirmed. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "OCPP 2.0.1 JSON support is listed as \"To follow\" in the source — not yet implemented in this revision."
- "SOAP/OCPP 1.6S is explicitly NOT supported."
- "source provides no hardware specifications (voltage, current, power); TF6771 is software, executed on a Beckhoff IPC."
- "source contains no explicit safety warnings, interlocks, or power-on sequencing requirements specific to TF6771 itself. (One implementation note in §4.4: \"For reasons of simplicity, security is not taken into account in this Quick Start. In real applications, secure implementation should always be a central component of the considerations.\" - this is a documentation caveat, not a device-side interlock.)"
- "full enumeration of E_OCPP1_AuthenticationMode values (source mentions None; other variants not surfaced in refined excerpt)."
- "full enumeration of E_OCPP_EncryptionMode values (source mentions None; other variants not surfaced in refined excerpt)."
- "full enumeration of E_OCPP1_MessageTrigger values for TriggerMessage."
- "full enumeration of E_OCPP1_Reason values for StopTransaction (source shows subset: None, EmergencyStop, EVDisconnected, HardReset, Local, Other, PowerLoss, Reboot, Remote, SoftReset, UnlockCommand — verify against complete type table in §5.2 of source)."
- "full enumeration of E_OCPP1_AuthorizationStatus, E_OCPP1_RegistrationStatus, E_OCPP1_ResetType, E_OCPP1_UnlockStatus, E_OCPP1_UpdateType, E_OCPP1_UpdateStatus, E_OCPP1_ClearCacheStatus, E_OCPP1_ClearChargingProfileStatus, E_OCPP1_ConfigurationStatus, E_OCPP1_GetCompositeScheduleStatus, E_OCPP1_TriggerMessageStatus, E_OCPP1_ReservationStatus, E_OCPP1_CancelReservationStatus, E_OCPP1_DataTransferStatus, E_OCPP1_DiagnosticsStatus, E_OCPP1_FirmwareStatus, E_OCPP1_Error, E_OCPP1_ResetStatus, E_OCPP1_AvailabilityStatus, E_OCPP1_ChargingProfilePurposeType, E_OCPP1_ChargingRateUnitType, E_OCPP1_ChargingProfileStatus, E_OCPP1_RemoteStartStopStatus — only Action enum and a partial set of values surfaced in the refined excerpt. Refer to §5.2 Data types of the source manual for the canonical tables."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
