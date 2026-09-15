---
spec_id: admin/givenergy-givenergy-cloud
schema_version: ai4av-public-spec-v1
revision: 1
title: "GivEnergy Cloud API Control Spec"
manufacturer: GivEnergy
model_family: GIV-HY5.0
aliases: []
compatible_with:
  manufacturers:
    - GivEnergy
  models:
    - GIV-HY5.0
    - GIV-HY4.6
    - GIV-HY3.6
    - "ALPS HY-5.0-GL"
    - "ALPS HY-4.6-GL"
    - "ALPS HY-3.6-GL"
    - "ALPS HY-6.0-GL"
    - "ALPS HY-7.0-GL"
    - "ALPS HY-8.0-GL"
    - GIV-HY-5.0-AU
    - GIV-HY-4.6-AU
    - GIV-HY-3.6-AU
    - GIV-HY-6.0-AU
    - GIV-HY-7.0-AU
    - GIV-HY-8.0-AU
    - GIV-PV-5.0-G3
    - GIV-PV-4.6-G3
    - GIV-PV-3.6-G3
    - GIV-PV-6.0-G3
    - ALPS-CUBE-5.0-PRO
    - ALPS-CUBE-4.6-PRO
    - ALPS-CUBE-3.6-PRO
    - ALPS-CUBE-6.0-PRO
    - ALPS-CUBE-7.0-PRO
    - ALPS-CUBE-8.0-PRO
    - GIV-AC3.0
    - GIV-AC3.6
    - GIV-3HY-6
    - GIV-3HY-8
    - GIV-3HY-10
    - GIV-3HY-11
    - GIV-3HY-15
    - GIV-3HY-20
    - "Commercial EMS"
    - "Plant EMS"
    - EMS-R
    - EMS-C
    - Gateway
    - All-In-One
    - GIV-AIO-AC-13.5-3.6
    - GIV-AIO-AC-13.5-5.0
    - GIV-HY-6.0-G3-HV
    - GIV-HY-8.0-G3-HV
    - GIV-HY-10.0-G3-HV
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - givenergy.cloud
source_urls:
  - https://givenergy.cloud/docs/api/v1
retrieved_at: 2026-09-02T20:36:08.323Z
last_checked_at: 2026-09-11T22:16:41.273Z
generated_at: 2026-09-11T22:16:41.273Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "list any major gaps here"
  - "port number not stated in source (HTTPS defaults to 443)"
  - "port number not stated in source"
  - "token format/structure not stated in source; operators obtain via API Tokens portal page"
  - "source contains general operational warnings (e.g. Winter Battery"
verification:
  verdict: verified
  checked_at: 2026-09-11T22:16:41.273Z
  matched_actions: 99
  action_count: 99
  confidence: medium
  summary: "All 99 spec endpoints map1:1 to endpoints documented in the refined source; transport base URL, Bearer auth header, and headers all verbatim. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-09-02
---

# GivEnergy Cloud API Control Spec

## Summary
Cloud-hosted REST API for GivEnergy inverters, batteries, EV chargers, gateways, EMS devices, sites, meters, locks, tariff automation, and account management. Communication is HTTPS REST with Bearer-token authentication; requires an active GivEnergy Premium subscription. This spec covers API v1 (documented at v1.53.0).

<!-- UNRESOLVED: list any major gaps here -->

## Transport
```yaml
# HTTPS REST; default 443 (standard for HTTPS), not stated by source.
protocols:
  - http
addressing:
  base_url: https://api.givenergy.cloud/v1
  # UNRESOLVED: port number not stated in source (HTTPS defaults to 443)
  port: null  # UNRESOLVED: port number not stated in source
auth:
  type: bearer
  header: Authorization
  scheme: Bearer
  token_format: api_token
  # UNRESOLVED: token format/structure not stated in source; operators obtain via API Tokens portal page
```

## Traits
```yaml
# - powerable       (powerable inferred from Eco/Timed-Charge/Timed-Discharge/Timed-Export/charge-mode and inverter settings commands)
# - routable        (no input/output routing in this cloud spec)
# - queryable       (numerous read/state endpoints present)
# - levelable       (charge/discharge rates, EV charge power limits, generator charge percent)
- powerable  # inferred from charge-mode, eco-mode, timed-charge, timed-discharge, timed-export, pause-battery, generator-mode presets
- queryable  # inferred from read setting, get latest system/energy/health/preset endpoints
- levelable  # inferred from adjust-charge-power-limit, timed-charge max_power_watts, generator-mode charge_power_percent
```

## Actions
```yaml
# Each entry represents one operation documented in the source. Every
# method+path combination counts as one action. URL parameters shown verbatim.
# Authorization: Bearer {YOUR_API_KEY} header required for all authenticated
# endpoints. Required headers: Accept: application/json and
# Content-Type: application/json.

# --- Account ---
- id: get_account
  label: Get Your Account Information
  kind: query
  command: "GET /v1/account"
  params: []
- id: get_account_by_id
  label: Get Account Information by ID
  kind: query
  command: "GET /v1/account/{user_id}"
  params:
    - name: user_id
      type: string
- id: get_account_dongles
  label: Get Account Dongles by ID
  kind: query
  command: "GET /v1/account/{user_username}/devices"
  params:
    - name: user_username
      type: string
    - name: page
      type: integer
    - name: pageSize
      type: integer
- id: get_account_by_username
  label: Get Account Information by Username
  kind: query
  command: "GET /v1/account/search/{user_username}"
  params:
    - name: user_username
      type: string
- id: get_account_children
  label: Get Your Account Children Information
  kind: query
  command: "GET /v1/account-children"
  params:
    - name: page
      type: integer
    - name: pageSize
      type: integer
- id: get_account_children_by_id
  label: Get Account Children Information by ID
  kind: query
  command: "GET /v1/account-children/{user_id}"
  params:
    - name: user_id
      type: string
    - name: page
      type: integer
    - name: pageSize
      type: integer
- id: get_sso_accounts
  label: Get List Of Accounts Associated With Your SSO Identity
  kind: query
  command: "GET /v1/sso/me/accounts"
  params: []

# --- Communication Device ---
- id: get_communication_devices
  label: Get Your Communication Devices
  kind: query
  command: "GET /v1/communication-device"
  params:
    - name: page
      type: integer
    - name: pageSize
      type: integer
- id: get_communication_device_by_serial
  label: Get Communication Device Information by Serial Number
  kind: query
  command: "GET /v1/communication-device/{communicationDevice_serial_number}"
  params:
    - name: communicationDevice_serial_number
      type: string

# --- EMS Data ---
- id: get_ems_system_data_latest
  label: Get Latest EMS System Data
  kind: query
  command: "GET /v1/ems/{inverter_serial_number}/system-data/latest"
  params:
    - name: inverter_serial_number
      type: string

# --- EV Charger ---
- id: get_ev_chargers
  label: Get Your EV Chargers
  kind: query
  command: "GET /v1/ev-charger"
  params:
    - name: page
      type: integer
    - name: pageSize
      type: integer
- id: get_ev_charger_by_uuid
  label: Get EV Charger by UUID
  kind: query
  command: "GET /v1/ev-charger/{charger_uuid}"
  params:
    - name: charger_uuid
      type: string
- id: get_ev_charger_meter_data
  label: Get EV Charger Data Points
  kind: query
  command: "GET /v1/ev-charger/{charger_uuid}/meter-data"
  params:
    - name: charger_uuid
      type: string
    - name: start_time
      type: string
    - name: end_time
      type: string
    - name: measurands
      type: string
    - name: meter_ids
      type: integer
    - name: page
      type: integer
    - name: pageSize
      type: integer
- id: get_ev_charger_supported_commands
  label: Get Supported Commands
  kind: query
  command: "GET /v1/ev-charger/{charger_uuid}/commands"
  params:
    - name: charger_uuid
      type: string
- id: get_ev_charger_command_data
  label: Get Command Data
  kind: query
  command: "GET /v1/ev-charger/{charger_uuid}/commands/{command_id}"
  params:
    - name: charger_uuid
      type: string
    - name: command_id
      type: string
- id: send_ev_charger_command
  label: Send Command
  kind: action
  command: "POST /v1/ev-charger/{charger_uuid}/commands/{command_id}"
  params:
    - name: charger_uuid
      type: string
    - name: command_id
      type: string
    - name: command_body
      type: object
      description: Body varies by command_id; see EV Charger Commands below
- id: get_ev_charger_charging_sessions
  label: Get Charging Sessions
  kind: query
  command: "GET /v1/ev-charger/{charger_uuid}/charging-sessions"
  params:
    - name: charger_uuid
      type: string
    - name: start_time
      type: string
    - name: end_time
      type: string
    - name: page
      type: integer
    - name: pageSize
      type: integer

# --- EV Charger Commands (sent via POST /v1/ev-charger/{uuid}/commands/{command-id}) ---
- id: evc_start_charge
  label: EV Charger Start Charge
  kind: action
  command: "POST /v1/ev-charger/{charger_uuid}/commands/start-charge"
  params:
    - name: charger_uuid
      type: string
- id: evc_stop_charge
  label: EV Charger Stop Charge
  kind: action
  command: "POST /v1/ev-charger/{charger_uuid}/commands/stop-charge"
  params:
    - name: charger_uuid
      type: string
- id: evc_adjust_charge_power_limit
  label: EV Charger Adjust Charge Power Limit
  kind: action
  command: "POST /v1/ev-charger/{charger_uuid}/commands/adjust-charge-power-limit"
  params:
    - name: charger_uuid
      type: string
    - name: limit
      type: number
      description: Between 6 and 32 (A or W depending on unit)
- id: evc_set_plug_and_go
  label: EV Charger Set Plug and Go
  kind: action
  command: "POST /v1/ev-charger/{charger_uuid}/commands/set-plug-and-go"
  params:
    - name: charger_uuid
      type: string
    - name: enabled
      type: boolean
- id: evc_set_session_energy_limit
  label: EV Charger Set Session Energy Limit
  kind: action
  command: "POST /v1/ev-charger/{charger_uuid}/commands/set-session-energy-limit"
  params:
    - name: charger_uuid
      type: string
    - name: limit
      type: number
      description: Between 0.1 and 250 kWh
- id: evc_set_schedule
  label: EV Charger Set Schedule
  kind: action
  command: "POST /v1/ev-charger/{charger_uuid}/commands/set-schedule"
  params:
    - name: charger_uuid
      type: string
    - name: schedule_id
      type: string
    - name: name
      type: string
    - name: periods
      type: array
- id: evc_unlock_connector
  label: EV Charger Unlock Connector
  kind: action
  command: "POST /v1/ev-charger/{charger_uuid}/commands/unlock-connector"
  params:
    - name: charger_uuid
      type: string
- id: evc_delete_charging_profile
  label: EV Charger Delete Charging Profile
  kind: action
  command: "POST /v1/ev-charger/{charger_uuid}/commands/delete-charging-profile"
  params:
    - name: charger_uuid
      type: string
    - name: schedule_id
      type: string
- id: evc_change_mode
  label: EV Charger Change Mode
  kind: action
  command: "POST /v1/ev-charger/{charger_uuid}/commands/change-mode"
  params:
    - name: charger_uuid
      type: string
    - name: mode
      type: string
      description: One of SuperEco, Eco, Boost, ModbusSlave
- id: evc_restart_charger
  label: EV Charger Restart
  kind: action
  command: "POST /v1/ev-charger/{charger_uuid}/commands/restart-charger"
  params:
    - name: charger_uuid
      type: string
    - name: hard_reset
      type: boolean
- id: evc_change_randomised_delay_duration
  label: EV Charger Set Randomised Delay Duration
  kind: action
  command: "POST /v1/ev-charger/{charger_uuid}/commands/change-randomised-delay-duration"
  params:
    - name: charger_uuid
      type: string
    - name: duration
      type: number
      description: 600 to 1800 (seconds)
- id: evc_add_id_tags
  label: EV Charger Add ID Tags
  kind: action
  command: "POST /v1/ev-charger/{charger_uuid}/commands/add-id-tags"
  params:
    - name: charger_uuid
      type: string
    - name: id_tags
      type: array
- id: evc_delete_id_tags
  label: EV Charger Delete ID Tags
  kind: action
  command: "POST /v1/ev-charger/{charger_uuid}/commands/delete-id-tags"
  params:
    - name: charger_uuid
      type: string
    - name: id_tags
      type: array
- id: evc_rename_id_tag
  label: EV Charger Rename ID Tag
  kind: action
  command: "POST /v1/ev-charger/{charger_uuid}/commands/rename-id-tag"
  params:
    - name: charger_uuid
      type: string
    - name: tag_id
      type: string
    - name: alias
      type: string
- id: evc_installation_mode
  label: EV Charger Set Installation Mode (Deprecated)
  kind: action
  command: "POST /v1/ev-charger/{charger_uuid}/commands/installation-mode"
  params:
    - name: charger_uuid
      type: string
    - name: installation_mode
      type: string
      description: standalone, ct_meter, inverter_control, or hybrid_inverter_control
- id: evc_setup_version
  label: EV Charger Setup Version
  kind: action
  command: "POST /v1/ev-charger/{charger_uuid}/commands/setup-version"
  params:
    - name: charger_uuid
      type: string
    - name: setup_version
      type: integer
- id: evc_set_active_schedule
  label: EV Charger Set Active Schedule
  kind: action
  command: "POST /v1/ev-charger/{charger_uuid}/commands/set-active-schedule"
  params:
    - name: charger_uuid
      type: string
    - name: schedule_id
      type: string
- id: evc_set_max_import_capacity
  label: EV Charger Set Max Import Capacity
  kind: action
  command: "POST /v1/ev-charger/{charger_uuid}/commands/set-max-import-capacity"
  params:
    - name: charger_uuid
      type: string
    - name: value
      type: integer
      description: 40 to 100 (amps)
- id: evc_enable_front_panel_led
  label: EV Charger Front Panel LED
  kind: action
  command: "POST /v1/ev-charger/{charger_uuid}/commands/enable-front-panel-led"
  params:
    - name: charger_uuid
      type: string
    - name: value
      type: boolean
- id: evc_configure_inverter_control
  label: EV Charger Configure Inverter Control
  kind: action
  command: "POST /v1/ev-charger/{charger_uuid}/commands/configure-inverter-control"
  params:
    - name: charger_uuid
      type: string
    - name: inverter_battery_export_split
      type: string
    - name: max_battery_discharge_power_to_evc
      type: integer
    - name: mode
      type: string
      description: Eco, SuperEco, or Boost
- id: evc_perform_factory_reset
  label: EV Charger Factory Reset
  kind: action
  command: "POST /v1/ev-charger/{charger_uuid}/commands/perform-factory-reset"
  params:
    - name: charger_uuid
      type: string
- id: evc_configuration_mode
  label: EV Charger Configuration Mode
  kind: action
  command: "POST /v1/ev-charger/{charger_uuid}/commands/configuration-mode"
  params:
    - name: charger_uuid
      type: string
    - name: configuration_mode
      type: string
      description: One of A, B, C, D, E
- id: evc_enable_local_control
  label: EV Charger Enable Local Control
  kind: action
  command: "POST /v1/ev-charger/{charger_uuid}/commands/enable-local-control"
  params:
    - name: charger_uuid
      type: string
    - name: value
      type: boolean
- id: evc_read_cp_voltage_and_duty_cycle
  label: EV Charger Read CP Voltage and Duty Cycle
  kind: action
  command: "POST /v1/ev-charger/{charger_uuid}/commands/read-cp-voltage-and-duty-cycle"
  params:
    - name: charger_uuid
      type: string
- id: evc_adjust_cp_voltage_range
  label: EV Charger Adjust CP Voltage Range
  kind: action
  command: "POST /v1/ev-charger/{charger_uuid}/commands/adjust-cp-voltage-range"
  params:
    - name: charger_uuid
      type: string
    - name: min
      type: number
      description: 7.6 to 8
    - name: max
      type: number
      description: 10 to 10.5
- id: evc_adjust_suspended_state_wait_timeout
  label: EV Charger Adjust Suspended State Wait Timeout
  kind: action
  command: "POST /v1/ev-charger/{charger_uuid}/commands/adjust-suspended-state-wait-timeout"
  params:
    - name: charger_uuid
      type: string
    - name: value
      type: integer
      description: 0 to 43200

# --- Energy Flow Data ---
- id: get_energy_flow_data
  label: Get Energy Flow Data (Deprecated)
  kind: query
  command: "POST /v1/inverter/{inverter_serial_number}/energy-flows"
  params:
    - name: inverter_serial_number
      type: string
    - name: start_time
      type: string
    - name: end_time
      type: string
    - name: grouping
      type: integer
    - name: types
      type: array

# --- Inverter Health ---
- id: get_health_checks
  label: Get Inverter Health Checks
  kind: query
  command: "GET /v1/inverter/{inverter_serial_number}/health"
  params:
    - name: inverter_serial_number
      type: string

# --- Inverter Control (Single) ---
- id: inverter_send_custom_command
  label: Send Custom Hex Command to Inverter
  kind: action
  command: "POST /v1/inverter/{inverter_serial_number}/debug/transparent/send"
  params:
    - name: inverter_serial_number
      type: string
    - name: hex
      type: string
      description: Hex string passed transparently to inverter
- id: inverter_get_settings
  label: Get Inverter Settings List
  kind: query
  command: "GET /v1/inverter/{inverter_serial_number}/settings"
  params:
    - name: inverter_serial_number
      type: string
- id: inverter_read_setting
  label: Read Inverter Setting
  kind: query
  command: "POST /v1/inverter/{inverter_serial_number}/settings/{setting_id}/read"
  params:
    - name: inverter_serial_number
      type: string
    - name: setting_id
      type: integer
    - name: context
      type: string
- id: inverter_modify_setting
  label: Modify Inverter Setting
  kind: action
  command: "POST /v1/inverter/{inverter_serial_number}/settings/{setting_id}/write"
  params:
    - name: inverter_serial_number
      type: string
    - name: setting_id
      type: integer
    - name: value
      type: string
    - name: context
      type: string

# --- Inverter Control (Presets) ---
- id: inverter_get_setting_presets
  label: Get Setting Presets
  kind: query
  command: "GET /v1/inverter/{inverter_serial_number}/presets"
  params:
    - name: inverter_serial_number
      type: string
- id: inverter_get_preset_values
  label: Get Preset Values
  kind: query
  command: "GET /v1/inverter/{inverter_serial_number}/presets/{id}"
  params:
    - name: inverter_serial_number
      type: string
    - name: id
      type: string
- id: inverter_modify_preset
  label: Modify Preset
  kind: action
  command: "POST /v1/inverter/{inverter_serial_number}/presets/{preset}"
  params:
    - name: inverter_serial_number
      type: string
    - name: preset
      type: string
      description: Preset ID (identifier) or legacy numeric ID
    - name: context
      type: string
    - name: force
      type: boolean

# Preset identifiers (sent as {preset} parameter of inverter_modify_preset):
# eco-mode, timed-charge, timed-discharge, timed-export,
# battery-operating-range, reset-to-defaults, winter-battery-conditioning,
# plant-ems-enable-control, grid-settings, parallel-settings,
# generator-mode, smart-load, pause-battery

# --- Inverter Control (Preset Profiles) ---
- id: preset_profile_list
  label: Get Inverter Preset Profiles
  kind: query
  command: "GET /v1/inverter/{inverter_serial_number}/preset-profile"
  params:
    - name: inverter_serial_number
      type: string
    - name: name
      type: string
    - name: presets
      type: array
- id: preset_profile_create
  label: Create Inverter Preset Profile
  kind: action
  command: "POST /v1/inverter/{inverter_serial_number}/preset-profile"
  params:
    - name: inverter_serial_number
      type: string
    - name: name
      type: string
    - name: preset
      type: string
- id: preset_profile_update
  label: Update Inverter Preset Profile
  kind: action
  command: "PUT /v1/inverter/{inverter_serial_number}/preset-profile"
  params:
    - name: inverter_serial_number
      type: string
    - name: name
      type: string
    - name: preset
      type: string
- id: preset_profile_apply
  label: Apply Inverter Preset Profile
  kind: action
  command: "POST /v1/inverter/{inverter_serial_number}/preset-profile/apply"
  params:
    - name: inverter_serial_number
      type: string
    - name: name
      type: string
    - name: presets
      type: array
    - name: delete_after_apply
      type: boolean
- id: preset_profile_delete
  label: Delete Inverter Preset Profile
  kind: action
  command: "DELETE /v1/inverter/{inverter_serial_number}/preset-profile"
  params:
    - name: inverter_serial_number
      type: string
    - name: name
      type: string
    - name: preset
      type: string

# --- Inverter Control (Snapshots) ---
- id: snapshot_delete
  label: Delete Inverter Snapshot
  kind: action
  command: "DELETE /v1/inverter/{inverter_serial_number}/snapshot/{name}"
  params:
    - name: inverter_serial_number
      type: string
    - name: name
      type: string
- id: snapshot_take
  label: Take Inverter Snapshot
  kind: action
  command: "POST /v1/inverter/{inverter_serial_number}/snapshot/{name}"
  params:
    - name: inverter_serial_number
      type: string
    - name: name
      type: string
    - name: sync
      type: boolean
    - name: context
      type: string
- id: snapshot_restore
  label: Restore Inverter Snapshot
  kind: action
  command: "POST /v1/inverter/{inverter_serial_number}/snapshot/{name}/restore"
  params:
    - name: inverter_serial_number
      type: string
    - name: name
      type: string
    - name: sync
      type: boolean
    - name: context
      type: string
- id: snapshot_exists
  label: Determine if Snapshot Exists
  kind: query
  command: "GET /v1/inverter/{inverter_serial_number}/snapshot/{name}"
  params:
    - name: inverter_serial_number
      type: string
    - name: name
      type: string

# --- Inverter Control (Multiple) ---
- id: multi_control_modify_setting
  label: Modify Setting on Multiple Inverters
  kind: action
  command: "POST /v1/multi-control/write"
  params:
    - name: inverter_serials
      type: array
    - name: setting_id
      type: integer
    - name: value
      type: string
- id: multi_control_read_setting
  label: Read Setting on Multiple Inverters
  kind: action
  command: "POST /v1/multi-control/read"
  params:
    - name: inverter_serials
      type: array
    - name: setting_id
      type: integer

# --- Inverter Data ---
- id: inverter_request_data
  label: Request Inverter Data
  kind: action
  command: "GET /v1/inverter/{inverter_serial_number}/request-data"
  params:
    - name: inverter_serial_number
      type: string
- id: inverter_system_data_latest
  label: Get Latest Inverter System Data
  kind: query
  command: "GET /v1/inverter/{inverter_serial_number}/system-data/latest"
  params:
    - name: inverter_serial_number
      type: string
- id: inverter_meter_data_latest
  label: Get Latest Inverter Energy Data
  kind: query
  command: "GET /v1/inverter/{inverter_serial_number}/meter-data/latest"
  params:
    - name: inverter_serial_number
      type: string
- id: inverter_events
  label: Get Inverter Events
  kind: query
  command: "GET /v1/inverter/{inverter_serial_number}/events"
  params:
    - name: inverter_serial_number
      type: string
    - name: cleared
      type: boolean
    - name: start
      type: string
    - name: end
      type: string
    - name: page
      type: integer
    - name: pageSize
      type: integer
- id: inverter_data_points
  label: Get Inverter Data Points
  kind: query
  command: "GET /v1/inverter/{inverter_serial_number}/data-points/{date}"
  params:
    - name: inverter_serial_number
      type: string
    - name: date
      type: string
    - name: page
      type: integer
    - name: pageSize
      type: integer

# --- Locking ---
- id: lock_get_config
  label: Get Locking Config
  kind: query
  command: "GET /v1/lock"
  params: []
- id: lock_delete
  label: Delete Lock
  kind: action
  command: "DELETE /v1/lock/{id}"
  params:
    - name: id
      type: string
- id: lock_get
  label: Get Locks
  kind: query
  command: "GET /v1/lock/{type}/{id}"
  params:
    - name: type
      type: string
    - name: id
      type: string
- id: lock_create
  label: Create Lock
  kind: action
  command: "POST /v1/lock/{type}/{id}/create"
  params:
    - name: type
      type: string
    - name: id
      type: string
    - name: expires_at
      type: string
    - name: reason
      type: string
- id: lock_cleanup
  label: Cleanup Locks
  kind: action
  command: "POST /v1/lock/{type}/{id}/cleanup"
  params:
    - name: type
      type: string
    - name: id
      type: string

# --- Meter ---
- id: meter_historic
  label: Get Historic Meter Data
  kind: query
  command: "GET /v1/inverter/{inverter_serial_number}/meter/data"
  params:
    - name: inverter_serial_number
      type: string
    - name: address
      type: integer
      description: 1 to 8
    - name: start_time
      type: string
    - name: end_time
      type: string

# --- Notifications ---
- id: send_notification
  label: Send Notification
  kind: action
  command: "POST /v1/notification/send"
  params:
    - name: platforms
      type: array
      description: One or more of persist, push
    - name: title
      type: string
    - name: body
      type: string
    - name: icon
      type: string

# --- Site ---
- id: site_list
  label: Get Your Sites
  kind: query
  command: "GET /v1/site"
  params:
    - name: page
      type: integer
    - name: pageSize
      type: integer
- id: site_get
  label: Get Single Site by ID
  kind: query
  command: "GET /v1/site/{plant_id}"
  params:
    - name: plant_id
      type: integer
- id: site_energy_data_latest
  label: Get Realtime Site Energy Data
  kind: query
  command: "GET /v1/site/{site_plant_id}/energy-data/latest"
  params:
    - name: site_plant_id
      type: integer
- id: site_data_latest
  label: Get Realtime Site Data
  kind: query
  command: "GET /v1/site/{site_plant_id}/data/latest"
  params:
    - name: site_plant_id
      type: integer
- id: site_status_get
  label: Get Site Status
  kind: query
  command: "GET /v1/site/{site_plant_id}/status"
  params:
    - name: site_plant_id
      type: integer
- id: site_status_update
  label: Update Site Status
  kind: action
  command: "POST /v1/site/{site_plant_id}/status"
  params:
    - name: site_plant_id
      type: integer
    - name: status
      type: string
      description: vacant, opted_in, opted_out, or null to clear

# --- Smart Device ---
- id: smart_device_list
  label: Get Your Smart Devices
  kind: query
  command: "GET /v1/smart-device"
  params:
    - name: page
      type: integer
    - name: pageSize
      type: integer
- id: smart_device_create
  label: Create Smart Device
  kind: action
  command: "POST /v1/smart-device"
  params:
    - name: serial_number
      type: string
    - name: alias
      type: string
    - name: product_name
      type: string
    - name: manufacturer
      type: string
    - name: other_data
      type: object
- id: smart_device_get
  label: Get Smart Device by ID
  kind: query
  command: "GET /v1/smart-device/{smartDevice_uuid}"
  params:
    - name: smartDevice_uuid
      type: string
- id: smart_device_data_points
  label: Get Smart Device Data Points by ID
  kind: query
  command: "GET /v1/smart-device/{smartDevice_uuid}/data"
  params:
    - name: smartDevice_uuid
      type: string
    - name: page
      type: integer
    - name: pageSize
      type: integer
- id: smart_device_data_point_create
  label: Create Smart Device Data Point
  kind: action
  command: "POST /v1/smart-device/{smartDevice_uuid}/data"
  params:
    - name: smartDevice_uuid
      type: string
    - name: time
      type: string
    - name: power
      type: integer

# --- Smart Tariff ---
- id: smart_tariff_regions
  label: Get Available Smart Tariff Regions
  kind: query
  command: "GET /v1/smart-tariff/region"
  params: []
- id: smart_tariff_providers
  label: Get Smart Tariff Providers for a Region
  kind: query
  command: "GET /v1/smart-tariff/provider"
  params:
    - name: region
      type: string
- id: smart_tariff_static_tariff
  label: Get List of Tariffs for a Static Tariff Provider
  kind: query
  command: "GET /v1/smart-tariff/static/{provider_id}/tariff"
  params:
    - name: provider_id
      type: string
    - name: parent_guid
      type: string
- id: smart_tariff_market_pricing_tariff
  label: Get List of Tariffs for a Market Pricing Provider
  kind: query
  command: "GET /v1/smart-tariff/market-pricing/{provider_id}/tariff"
  params:
    - name: provider_id
      type: string
- id: smart_tariff_onboard
  label: Onboard to Smart Tariff Automation
  kind: action
  command: "POST /v1/smart-tariff/tariff"
  params:
    - name: provider_id
      type: string
    - name: provider_settings
      type: object
    - name: region
      type: string
- id: smart_tariff_update_settings
  label: Update Smart Tariff Provider Settings
  kind: action
  command: "PUT /v1/smart-tariff/tariff"
  params:
    - name: provider_id
      type: string
    - name: provider_settings
      type: object
- id: smart_tariff_offboard
  label: Offboard Smart Tariff Automation
  kind: action
  command: "DELETE /v1/smart-tariff/tariff"
  params: []
- id: smart_tariff_automation_data
  label: Get Automation Data for a Given Date
  kind: query
  command: "GET /v1/smart-tariff/automation/{date}"
  params:
    - name: date
      type: string
    - name: version
      type: integer
- id: smart_tariff_automation_settings_get
  label: Get User Automation Settings
  kind: query
  command: "GET /v1/smart-tariff/automation-settings"
  params: []
- id: smart_tariff_automation_settings_update
  label: Update Automation Settings
  kind: action
  command: "PUT /v1/smart-tariff/automation-settings"
  params:
    - name: is_enabled
      type: boolean
    - name: export_price
      type: number
    - name: slot_overrides
      type: array
- id: smart_tariff_scheduler_slots
  label: Get Scheduler Slots for Period
  kind: query
  command: "GET /v1/smart-tariff/scheduler/slots"
  params:
    - name: start_date
      type: string
    - name: end_date
      type: string

# --- Take Control ---
- id: inverter_take_control_start
  label: Take Control of an Inverter
  kind: action
  command: "POST /v1/inverter/{inverter_serial_number}/take-control/start"
  params:
    - name: inverter_serial_number
      type: string
    - name: reason
      type: string
    - name: expires_at
      type: string
- id: inverter_take_control_stop
  label: Relinquish Inverter Control
  kind: action
  command: "POST /v1/inverter/{inverter_serial_number}/take-control/stop"
  params:
    - name: inverter_serial_number
      type: string
```

## Feedbacks
```yaml
- id: inverter_status
  type: enum
  values: [NORMAL, WAITING, LOST, UNKNOWN, ERROR, WARNING, UPDATING, BYPASS, OFF_GRID, ON_GRID]
  description: Inverter operational status; from /v1/inverter/{serial}/system-data/latest and /system-data/latest
- id: ems_status
  type: enum
  values: [WAITING, NORMAL, WARNING, ERROR, UPDATING, BYPASS]
- id: ems_inverter_status
  type: enum
  values: [DISABLED, WAITING, ONLINE, WARNING, ERROR, FLASH, OFFLINE]
- id: ems_meter_status
  type: enum
  values: [DISABLED, ONLINE, OFFLINE]
- id: ems_meter_type
  type: enum
  values: [GRID, GENERATION, LOAD, OTHER]
- id: ev_charger_status
  type: enum
  values: [Available, Preparing, Charging, SuspendedEVSE, SuspendedEV, Finishing, Reserved, Unavailable, Faulted]
- id: health_status
  type: enum
  values: [ok, warning, error]
- id: inverter_command_response
  type: integer
  description: |
    Numeric response code for single-device remote control commands.
    Codes: 0 SUCCESS, -1 TIMEOUT, -2 CHARGER_OFFLINE, -3 INVALID_DATA,
    -4 FAILURE, -5 ERROR
- id: inverter_remote_control_code
  type: integer
  description: |
    Remote control code returned when sending commands to inverters.
    -1 Inverter Timeout, -2 Inverter Offline, -3 Inverter Not Found,
    -4 Validation errors, -5 Request Failed, -6 No response from comms,
    -7 Inverter Locked
- id: site_status_value
  type: enum
  values: [vacant, opted_in, opted_out]
- id: pause_battery_mode
  type: enum
  values: [0, 1, 2, 3]
  description: 0 Not Paused, 1 Pause Charge, 2 Pause Discharge, 3 Pause Charge and Discharge
- id: ev_charger_mode
  type: enum
  values: [SuperEco, Eco, Boost, ModbusSlave]
  description: Mode IDs from change-mode command; new IDs EcoPlus and EcoPlus are also listed
- id: ev_charger_configuration_mode
  type: enum
  values: [A, B, C, D, E]
- id: charge_session_stop_reason
  type: enum
  values: [EmergencyStop, EVDisconnected, HardReset, Local, Other, PowerLoss, Reboot, Remote, SoftReset, UnlockCommand, DeAuthorized]
- id: charge_session_id_tag
  type: string
  description: |
    ID of the tag used to start/stop a session, user ID when started via
    app/API/portal, "PLUG_AND_GO", or "INVERTER_CONTROL"
```

## Variables
```yaml
- id: charge_power_limit
  label: EV Charger Charge Power Limit
  type: number
  range: [6, 32]
  unit: A or W
- id: session_energy_limit
  label: EV Charger Session Energy Limit
  type: number
  range: [0.1, 250]
  unit: kWh
- id: randomised_delay_duration
  label: EV Charger Randomised Delay Duration
  type: number
  range: [600, 1800]
  unit: seconds
- id: ev_charger_max_import_capacity
  label: EV Charger Max Import Capacity
  type: integer
  range: [40, 100]
  unit: amps
- id: ev_charger_cp_voltage_min
  label: EV Charger CP Voltage Range Minimum
  type: number
  range: [7.6, 8]
  unit: V
- id: ev_charger_cp_voltage_max
  label: EV Charger CP Voltage Range Maximum
  type: number
  range: [10, 10.5]
  unit: V
- id: suspended_state_wait_timeout
  label: EV Charger Suspended State Wait Timeout
  type: integer
  range: [0, 43200]
  unit: seconds
- id: inverter_battery_export_split
  label: EV Charger to Inverter Battery Export Split
  type: string
  description: "0 to 1 (single character); 0.5 = 50/50 split"
- id: max_battery_discharge_power_to_evc
  label: Max Battery Discharge Power to EV Charger
  type: integer
  unit: watts
  minimum: 0
- id: winter_battery_conditioning_enabled
  label: Winter Battery Conditioning
  type: boolean
- id: pause_battery_mode_value
  label: Pause Battery Mode
  type: integer
  range: [0, 3]
- id: generator_mode
  label: Generator Mode Configuration
  type: object
  properties: [enabled, start_soc, stop_soc, charge_power_percent]
- id: inverter_setting_value
  label: Generic Inverter Setting
  type: string
  description: |
    Free-form value written via /v1/inverter/{serial}/settings/{id}/write;
    payload validation depends on the setting's `validation_rules`
- id: export_price
  label: Smart Tariff Automation Export Price
  type: number
  minimum: 0
```

## Events
```yaml
- id: inverter_event
  description: |
    Fault or notification event recorded against an inverter.
    Polled via GET /v1/inverter/{serial}/events; payload shape:
      { event: string, start_time: ISO8601, end_time: ISO8601 | null }
- id: charging_session_started
  description: |
    Charging session starts; surfaced via GET /v1/ev-charger/{uuid}/charging-sessions
    payload includes started_by, meter_start, started_at, stop_reason, etc.
- id: charging_session_stopped
  description: |
    Charging session stops; payload mirrors session object including stop_reason
- id: notification_received
  description: |
    Push notification delivered via POST /v1/notification/send target platforms
    (persist, push). Pull rather than push in this API.
```

## Macros
```yaml
- id: take_control_round_trip
  label: Take Control and Modify Inverter Settings
  description: |
    Sequence described in source "Take Control" section:
    1. POST /v1/inverter/{serial}/take-control/start (acquires lock + captures snapshot)
    2. Apply setting changes via /settings/{id}/write and/or /presets/{preset}
    3. POST /v1/inverter/{serial}/take-control/stop (restores snapshot + releases lock)
- id: snapshot_restore_round_trip
  label: Snapshot Round Trip
  description: |
    POST /v1/inverter/{serial}/snapshot/{name} (take) then later
    POST /v1/inverter/{serial}/snapshot/{name}/restore (restores settings, deletes snapshot)
- id: smart_tariff_automation_cycle
  label: Smart Tariff Onboard/Offboard
  description: |
    POST /v1/smart-tariff/tariff (onboard) → PUT /v1/smart-tariff/automation-settings
    (configure) → DELETE /v1/smart-tariff/tariff (offboard)
```

## Safety
```yaml
confirmation_required_for:
  - installation-mode (EV charger; deprecated)
  - perform-factory-reset (EV charger)
  - configuration-mode D and E (require Premium; modify inverter coupling)
  - inverter_take_control_stop (relinquishing control restores snapshot)
  - preset-profile_delete (only the creator can delete)
interlocks:
  - id: inverter_lock
    description: |
      Inverter control endpoints respect the locking system. Higher priority
      locks block lower priority actors. Code -7 (Inverter Locked) returned
      when target is locked by another actor.
  - id: take_control_lock
    description: |
      POST /v1/inverter/{serial}/take-control/start is rejected (422) if
      already locked by another actor; /take-control/stop is rejected if
      not locked by requesting actor.
# UNRESOLVED: source contains general operational warnings (e.g. Winter Battery
# Conditioning costed-charge note, optional Premium requirement) but no formal
# interlock procedures or sequencing requirements beyond the locks above.
```

## Notes
All requests require `Authorization: Bearer {YOUR_API_KEY}` and headers `Accept: application/json` plus `Content-Type: application/json`. Premium subscription required for most endpoints (HTTP 402 returned otherwise). Default rate limit 300 req/min shared across all endpoints; custom limits per endpoint noted in badges. Inverters without the `is-controllable` flag (e.g. child/AC-coupled inverters in parallel config) receive commands but may ignore them. The `smart-tariff` endpoints and Premium-only `configuration-mode D/E` codes are mutually dependent. EV charger payloads adhere to OCPP 1.6.

<!-- UNRESOLVED: -->
<!-- - Port number not stated in source (assumed HTTPS default 443). -->
<!-- - Bearer-token format/structure not stated in source. -->
<!-- - Firmware version compatibility per model not stated in source. -->
<!-- - Some setting IDs (e.g. 17 in examples) are model-specific; full setting catalogue not enumerated in source. -->
<!-- - Internal "consequatur" placeholder strings in source body examples indicate the rendered documentation derives from a Laravel Faker-backed schema; the real parameter names are as documented in each endpoint's parameter table. -->

## Provenance

```yaml
source_domains:
  - givenergy.cloud
source_urls:
  - https://givenergy.cloud/docs/api/v1
retrieved_at: 2026-09-02T20:36:08.323Z
last_checked_at: 2026-09-11T22:16:41.273Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-11T22:16:41.273Z
matched_actions: 99
action_count: 99
confidence: medium
summary: "All 99 spec endpoints map1:1 to endpoints documented in the refined source; transport base URL, Bearer auth header, and headers all verbatim. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "list any major gaps here"
- "port number not stated in source (HTTPS defaults to 443)"
- "port number not stated in source"
- "token format/structure not stated in source; operators obtain via API Tokens portal page"
- "source contains general operational warnings (e.g. Winter Battery"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
